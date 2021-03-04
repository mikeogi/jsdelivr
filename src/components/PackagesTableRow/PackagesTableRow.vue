<template>
  <tr
    class="PackagesTableRow"
  >
    <td class="PackagesTableRow">
      <div class="PackagesTableRow__name">
        {{ name }}
      </div>
    </td>
    <td class="PackagesTableRow">
      <div class="PackagesTableRow__description">
        {{ description }}
      </div>
    </td>
    <td class="PackagesTableRow">
      <div class="PackagesTableRow__latest">
        <span>
          <span class="font-weight-medium">
            Version:</span> {{ latestInfo.version }}
        </span>
        <span>
        <span class="font-weight-medium">
          Last update:</span> {{ latestInfo.modifiedDate }}
        </span>
      </div>
    </td>
    <td class="PackagesTableRow">
      <div class="PackagesTableRow__links">
        <a
          class="PackagesTableRow__links__link"
          :href="`${links.openbase}`"
          target="_blank"
        >
          <v-icon small>mdi-chart-line</v-icon>
        </a>
        <a
          class="PackagesTableRow__links__link"
          :href="`${links.home}`"
          target="_blank"
        >
          <v-icon small>mdi-github</v-icon>
        </a>
        <a
          class="PackagesTableRow__links__link"
          :href="`${links.user}`"
          target="_blank"
        >
          <img
            v-if="!isUserAvatarLoadError"
            class="PackagesTableRow__links__link__avatar"
            :src="`${userAvatar}`"
            @error="avatarLoadError"
            :alt="userName"
          />
          <v-icon v-else small>mdi-account</v-icon>
        </a>
      </div>
    </td>
    <td class="PackagesTableRow">
      <div class="PackagesTableRow__more_info"></div>
    </td>
    <td class="PackagesTableRow">
      <div class="PackagesTableRow__more_action">
        <v-btn @click="openPackage">Open</v-btn>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'PackagesTableRow',
  props: {
    name: { type: String, default: '' },
    description: { type: String, default: '' },
    latestInfo: { type: Object, default: () => ({
      version: 'unknown',
      modifiedDate: 'unknown',
    })},
    links: { type: Object, default: () => ({
      openbase: '',
      user: '',
      home: '',
    })},
    userAvatar: { type: String, default: '' },
    userName: { type: String, default: '' },
  },
  data() {
    return {
      isUserAvatarLoadError: false,
    }
  },
  methods: {
    avatarLoadError() {
      this.isUserAvatarLoadError = true
    },
    openPackage() {
      this.$emit('openPackage', this.name)
    },
  },
}
</script>

<style scoped lang="scss" src="./style.scss"></style>
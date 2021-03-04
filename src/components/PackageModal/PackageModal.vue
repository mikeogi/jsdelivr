<template>
  <v-dialog
    :value="modalOpen"
    transition="dialog-bottom-transition"
    @input="onClose"
  >
    <v-card class="PackageModal">
      <div class="PackageModal__readme">
        <vue-markdown v-if="pkg">{{ pkg.readme }}</vue-markdown>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import api from './../../utils/api'

export default {
  name: 'PackageModal',
  components: { VueMarkdown },
  props: {
    name: { type: String, required: true },
    modalOpen: { type: Boolean, default: false },
  },
  model: { prop: 'modalOpen', event: 'change' },
  data() {
    return {
      pkg: null,
      loading: false,
    }
  },
  async beforeMount() {
    await this.loadPackage()
  },
  methods: {
    onClose() {
      this.$emit('change', false)
    },
    async loadPackage() {
      this.loading = true
      const { response } = await api.getPackageByName(this.name)
      this.loading = false
      if (response.name) this.pkg = response
      else onClose()
    },
  },
}
</script>

<style scoped lang="scss" src="./style.scss"></style>
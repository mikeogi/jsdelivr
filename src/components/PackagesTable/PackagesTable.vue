<template>
  <div class="PackagesTable">
    <div v-if="isEmptyData" class="PackagesTable__Empty_content_row">
      <span>Best NPM package list</span>
    </div>
    <v-simple-table
      fixed-header
      v-else
    >
      <colgroup>
        <col span="1" style="width: 5%;">
        <col span="1" style="width: 40%;">
        <col span="1" style="width: 25%;">
        <col span="1" style="width: 15%;">
        <col span="1" style="width: 15%;">
      </colgroup>
      <thead>
        <tr>
          <th v-for="columnName in columns" :key="columnName" class="text-left">
            {{ columnName }}
          </th>
        </tr>
      </thead>
      <tbody :class="{
        PackagesTable__tbody__loading: packagesLoading,
        PackagesTable__tbody: true,
      }">
        <packages-table-row
          v-for="pkg in packages"
          :key="pkg.name"
          :name="pkg.name"
          :description="pkg.description"
          :latestInfo="getLatestInfo(pkg)"
          :links="getLinks(pkg)"
        ></packages-table-row>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PackagesTableRow from './../PackagesTableRow'

export default {
  name: "PackagesTable",
  components: { PackagesTableRow },
  computed: {
    ...mapGetters({
      packagesLoading: "packages/loading",
      packages: "packages/data",
      isEmptyData: "packages/isEmptyData"
    }),
    columns() {
      return ["Name", "Description", "Latest info", "Links", "More info"];
    }
  },
  methods: {
    getLatestInfo(pkg) {
      return {
        version: pkg.version,
        modifiedDate: pkg.modified,
      }
    },
    getLinks(pkg) {
      return {
        openbase: `https://openbase.com/js/${pkg.name}`,
        user: '',
        home: '',
      }
    }
  },
};
</script>

<style scoped lang="scss" src="./style.scss"></style>

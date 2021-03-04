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
        <col span="1" style="width: 20%;">
        <col span="1" style="width: 15%;">
        <col span="1" style="width: 15%;">
        <col span="1" style="width: 5%;">
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
          :userName="pkg.userName"
          :description="pkg.description"
          :latestInfo="getLatestInfo(pkg)"
          :links="getLinks(pkg)"
          :userAvatar="pkg.userAvatar"
          :deprecated="pkg.deprecated"
          :popular="pkg.popular"
          :license="pkg.license"
          @openPackage="onOpenPackage"
        ></packages-table-row>
      </tbody>
    </v-simple-table>
    <package-modal
      v-if="pkgName"
      :name="pkgName"
      :modalOpen="modalOpen"
      @change="closeModal"
    ></package-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PackageModal from '../PackageModal';
import PackagesTableRow from './../PackagesTableRow'

export default {
  name: "PackagesTable",
  components: {
    PackagesTableRow,
    PackageModal,
  },
  computed: {
    ...mapGetters({
      packagesLoading: "packages/loading",
      packages: "packages/data",
      isEmptyData: "packages/isEmptyData"
    }),
    columns() {
      return ["Name", "Description", "Latest info", "Links", "More info", "Action"];
    }
  },
  data() {
    return {
      pkgName: '',
      modalOpen: false,
    }
  },
  methods: {
    closeModal() {
      this.pkgName = ''
      this.modalOpen = false
    },
    onOpenPackage(name) {
      this.pkgName = name
      this.modalOpen = true
    },
    getLatestInfo(pkg) {
      return {
        version: pkg.latestVersion,
        modifiedDate: this.formatDate(pkg.modified),
      }
    },
    getLinks(pkg) {
      return {
        openbase: `https://openbase.com/js/${pkg.name}`,
        user: pkg.userPage,
        home: `https://github.com/${pkg.userName}/${pkg.name}`,
      }
    },
    formatDate(timestamp) {
      const date = new Date(timestamp)
      return new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
        .toISOString().split("T")[0];
    }
  },
};
</script>

<style scoped lang="scss" src="./style.scss"></style>

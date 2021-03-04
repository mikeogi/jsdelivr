<template>
  <v-app>
    <v-container>
      <h1 class="font-weight-medium">
        JS Delivr
      </h1>
      <search-field
        v-model="searchValue"
      ></search-field>
      <packages-table></packages-table>
      <div class="d-lg-flex Pagination">
        <pagination v-model="page"></pagination>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import SearchField from '@/components/SearchField'
import PackagesTable from '@/components/PackagesTable'
import Pagination from '@/components/Pagination'

export default {
  name: "App",

  components: {
    SearchField,
    PackagesTable,
    Pagination,
  },

  data() {
    const { search = '', page = 1 } = this.$route.query
    return {
      searchValue: search,
      page,
    }
  },

  async mounted() {
    if (this.searchValue) {
      this.fetchPackages()
    } else if (this.page > 1) {
      this.$router.push({ query: {} })
    }
  },

  watch: {
    async searchValue() {
      this.page = 1
      await this.fetchPackages()
    },
    async page() {
      await this.fetchPackages()
    },
  },

  methods: {
    async fetchPackages() {
      // then I'm tired of thinking. I should fix it somehow 🥱
      const thatQuery = this.$route.query
      const query = { search: this.searchValue }
      if (this.page > 1) query.page = this.page

      if (JSON.stringify(query) !== JSON.stringify(thatQuery)) {
        this.$router.push({ query })
      }

      await this.$store.dispatch('packages/fetchData', {
        searchValue: this.searchValue,
        page: this.page,
      })
    },
  },
};
</script>


<style scoped>
.Pagination {
  margin-top: 25px;
}
</style>
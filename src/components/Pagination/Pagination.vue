<template>
  <div class="Pagination">
    <v-pagination
      :value="Number(value)"
      :total-visible="6"
      @input="handleChange"
      :length="pageCount"
    ></v-pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Pagination',
  props: { value: { type: [Number, String], default: 1 } },
  model: { event: 'change', prop: 'value' },
  computed: {
    pageCount() {
      const s = this.$store.getters['packages/pageCount']
      return s > 1 ? s - 1 : s
    },
  },
  methods: {
    handleChange(value) {
      this.$emit('change', value)
    },
  },
}
</script>

<style scoped lang="scss" src="./style.scss"></style>

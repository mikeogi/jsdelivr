<template>
  <div class="SearchField">
    <v-text-field
      label="Search"
      placeholder="lodash"
      outlined
      @input="handleChange"
      :value="currentValue"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  name: "SearchField",
  props: {
    value: { type: String, default: "" }
  },
  data() {
    return {
      saveTimer: null,
      currentValue: this.value
    };
  },
  model: {
    prop: "value",
    event: "change"
  },
  methods: {
    handleChange(value) {
      this.currentValue = value;
      if (this.saveTimer) clearTimeout(this.saveTimer);
      this.saveTimer = setTimeout(() => {
        this.$emit("change", this.currentValue);
      }, 1200);
    }
  }
};
</script>

<style scoped lang="scss" src="./style.scss"></style>

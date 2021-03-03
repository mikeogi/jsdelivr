import Vue from "vue";
import Vuex, { createLogger } from "vuex";
import packages from "./packages";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    packages
  },
  plugins: [createLogger()]
});

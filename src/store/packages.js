import api from "../utils/api";
import router from '../plugins/router'

const state = () => ({
  loading: false,
  error: null,
  data: [],
  meta: {
    pageCount: 0,
    packageCount: 0,
  }
});

/**
 * nbHits: 380
nbPages: 38
 */

const actions = {
  async fetchData({ commit }, { searchValue = '', page = 1 }) {
    commit("startLoading");
    const { response } = await api.searchPackages(searchValue, page);
    commit("finishLoading");
    if (response.hits) {
      commit("setData", response.hits)
      commit('setPageCount', response.nbPages)
      commit('setPackageCount', response.nbHits)
    } else {
      commit('setData', [])
      commit('setError', response.message || 'Unknown error')
    }
  }
};

const mutations = {
  setSearchValue(state, value) {
    state.searchValue = value;
  },
  startLoading(state) {
    state.loading = true;
  },
  finishLoading(state) {
    state.loading = false;
  },
  setError(state, value) {
    state.errror = value;
  },
  setData(state, value) {
    state.data = value;
  },
  setPageCount(state, value) {
    state.meta.pageCount = value;
  },
  setPackageCount(state, value) {
    state.meta.packageCount = value
  },
};

const getters = {
  loading: state => state.loading,
  data: state => state.data,
  isEmptyData: (state, getters) => state.data.length <= 0 && !getters.loading,
  pageCount: state => state.meta.pageCount,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

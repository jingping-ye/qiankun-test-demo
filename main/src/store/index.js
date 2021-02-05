import Vue from "vue";
import Vuex from "vuex";

import SecureLS from "secure-ls";
import createPersistedState from "vuex-persistedstate";

const ls = new SecureLS({ isCompression: false });

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
  },
  mutations: {
    setLoginStatus(state, val) {
      state.isLogin = val;
    },
  },
  actions: {},
  modules: {},
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
      paths: ["isLogin"],
    }),
  ],
});

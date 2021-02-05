import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "zone.js";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import globalState from "./globalState";

import "./registerMicroApps";

Vue.config.productionTip = false;
Vue.prototype.$globalState = globalState;

Vue.use(Antd);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#root-app");

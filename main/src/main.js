import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import microApps from "./microApps";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import { registerMicroApps, start } from "qiankun";
import globalState from "./globalState";

Vue.config.productionTip = false;
Vue.prototype.$globalState = globalState;

Vue.use(Antd);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#root-app");

registerMicroApps(microApps, {
  beforeLoad: (app) => {
    console.log("before load app.name====>>>>>", app.name);
  },
  beforeMount: [
    (app) => {
      console.log("[LifeCycle] before mount %c%s", "color: green;", app.name);
    },
  ],
  afterMount: [
    (app) => {
      console.log("[LifeCycle] after mount %c%s", "color: green;", app.name);
    },
  ],
  afterUnmount: [
    (app) => {
      console.log("[LifeCycle] after unmount %c%s", "color: green;", app.name);
    },
  ],
});

start();

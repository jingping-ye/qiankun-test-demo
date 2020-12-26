import { initGlobalState } from "qiankun";
import Vue from "vue";

// Vue.observable是为了让initialState变成可响应：https://cn.vuejs.org/v2/api/#Vue-observable。
let initialState = Vue.observable({
  userInfo: {},
});

const actions = initGlobalState(initialState);

actions.onGlobalStateChange((newV, oldV) => {
  console.log("%cmain change", "color:red");
  console.log("newV===", newV);
  console.log("oldV===", oldV);
  for (let key in newV) {
    initialState[key] = newV[key];
  }
});

// 自定义方法用于获取state
actions.getGlobalState = (key) => {
  return key ? initialState[key] : initialState;
};

export default actions;

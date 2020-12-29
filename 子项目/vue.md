# vue微应用的搭建与配置

1. 在项目根目录新建一个名为`sub-vue`的子应用

```bash
vue create sub-vue
```

2. 新建`vue.config.js`文件，写入以下内容：

```js
// package.json的name需注意与主应用一致
const { name } = require("./package.json");

module.exports = {
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: "umd",
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
  devServer: {
    port: process.env.VUE_APP_PORT, 
    headers: {
      "Access-Control-Allow-Origin": "*", // 主应用获取子应用时跨域响应头
    },
  },
};
```

3. 新建`.env.development`文件，声明运行端口为`7788`

```js
VUE_APP_PORT=7788
```

4. 新建`src/public-path.js`

```js
(function() {
  if (window.__POWERED_BY_QIANKUN__) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-undef
      __webpack_public_path__ = `//localhost:${process.env.VUE_APP_PORT}/`;
      return;
    }
    // eslint-disable-next-line no-undef
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
  }
})();
```

5. 修改`src/router/index.js`文件，改为只暴露routes。

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

export default routes;
```

6. 修改`main.js`，引入`public-path.js`，修改`render`，添加生命周期，routes等。

```js
import "./public-path";
import Vue from "vue";
import App from "./App.vue";
import routes from "./router";
import store from "./store";
import VueRouter from "vue-router";

Vue.config.productionTip = false;

let instance = null;

function render(props = {}) {
  const { container, routerBase } = props;
  const router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? routerBase : process.env.BASE_URL,
    mode: "history",
    routes,
  });
  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector("#app") : "#app");
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log("[vue] vue app bootstraped");
}

export async function mount(props) {
  console.log("[vue] props from main framework", props);

  render(props);
}

export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
}
```

7. 运行应用，应用应该正常启动。

```bash
npm run serve
```


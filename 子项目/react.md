# react微应用的创建与配置

## 1. 基础项目框架搭建

1. 创建项目`sub-react`

```js
 npx create-react-app sub-react
```

2. 安装`react-app-rewired`用于配置`webpack`而无需`reject`。

```js
npm install react-app-rewired -D
```

3. 更改`package.json`中的`scripts`，调整为使用`react-app-rewired`。

```js
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
},
```

4. 新建`.env`文件，添加`PORT`变量，指定运行端口。

```js
PORT=7788
```

5. 新建`sub-react/config-overrides.js`文件，写入webpack配置

```js
const { name } = require("./package.json");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  webpack: function override(config, env) {
    config.output.library = `${name}-[name]`;
    config.output.libraryTarget = "umd";
    config.output.jsonpFunction = `webpackJsonp_${name}`;

    // Remove 'react-refresh' from the loaders.
    for (const rule of config.module.rules) {
      if (!rule.oneOf) continue;

      for (const one of rule.oneOf) {
        if (one.loader && one.loader.includes("babel-loader") && one.options && one.options.plugins) {
          one.options.plugins = one.options.plugins.filter(
            (plugin) => typeof plugin !== "string" || !plugin.includes("react-refresh")
          );
        }
      }
    }

    config.plugins = config.plugins.filter(
      (plugin) => !(plugin instanceof webpack.HotModuleReplacementPlugin) && !(plugin instanceof ReactRefreshPlugin)
    );

    return config;
  },
  devServer: (configFunction) => {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      config.open = false;
      config.hot = false;
      config.headers = {
        "Access-Control-Allow-Origin": "*",
      };
      return config;
    };
  },
};
```

6. 新增`src/public-path.js`，写入以下内容：

```js
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
```

7. 改造`index.js`,引入`public-path.js`，添加生命周期函数等。

```js
import "./public-path";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

function render() {
  ReactDOM.render(
     <App />,
    document.getElementById("root")
  );
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log("react app bootstraped");
}
/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  render();
}
/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
  ReactDOM.unmountComponentAtNode(document.getElementById("root"));
}
/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
  console.log("update props", props);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

## 2. 路由

1. 安装`react-router`

```bash
npm install react-router -D
```

2. 编写两个组件用于测试

```bash
|--src
	|-- views
		|-- home
			|-- home.js
		|-- about
			|-- about.js
```

3. 编写`src/router/index.js`文件

```js
import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "../views/home/home";
import About from "../views/about/about";
const BASE_NAME = window.__POWERED_BY_QIANKUN__ ? "/react" : "/sub-react/";
const RouteView = () => (
  <BrowserRouter basename={BASE_NAME}>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/about' component={About}></Route>
    </Switch>
  </BrowserRouter>
);

export default RouteView;
```

3. 在`App.js`中引入

```js
import "./App.css";
import RouterView from "./router/index";
import "antd/dist/antd.css";

function App() {
  return (
    <div className='App'>
      <RouterView />
    </div>
  );
}

export default App;
```
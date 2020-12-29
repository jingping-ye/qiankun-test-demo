# Ngnix部署

## 前提准备

1.  假设部署时主应用放在服务器根目录下，子应用直接放在主应用目录中，如下：

```bash
|-- css
|-- js
|-- favicon.ico
|-- index.html
|-- sub-vue
|-- sub-react
|-- ...
```

2. 注意要点：

   - `activeRule` 、子项目菜单的路由前缀、`history` 模式路由的 `base` ，这三个的值是一样的。
   - `activeRule` 不能和**子项目的真实访问路径一样**，否则在主项目页面刷新会直接变成子项目页面
   - 子项目的真实访问路径就是子项目的 `entry`，`entry` 可以为相对路径
   - 子项目的 `entry` 路径最后面的 `/` 不可省略，否则 `publicPath` 会设置错误，例如子项的访问路径是 `http://localhost:8080/app1`,那么 `entry` 就是 `http://localhost:8080/app1/`

3. 因为上述注意要点，我们要将`activeRules`变化。

   - 访问主应用时，路径为:`http://localhost:8080`

   - 访问`sub-vue`子应用时，路径为：`http://localhost:8080/vue`

## 实践

### 1. 部署vue应用

1. 修改主应用中`microApps.js`文件，设置不同的`entry`和`activeRules`

```js
const isProduction = process.env.NODE_ENV === "production";
let microApps = [
  {
    name: "sub-vue",
    entry: isProduction ? "/sub-vue/" : "//localhost:7777/sub-vue/",
    activeRule: "/vue",
  },
];
```

2. 修改子应用`sub-vue`中的`vue.config.js`文件中的`publicPath`如下：

```js
module.exports = {
  publicPath: "/sub-vue/",
    ...
};
```

3. 配合`ngnix`对应网站的`vhosts.conf`;

```conf
server{
	listen        8080;
    server_name  localhost;
    location / {
        root "D:/installed/resource/phpstudy_pro/WWW"; # 主应用所在的目录
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
    location /sub-vue {
        root "D:/installed/resource/phpstudy_pro/WWW";
        index index.html index.htm;
        try_files $uri $uri/ /sub-vue/index.html;
    }
}
```

### 2. 部署react应用

1. 修改主应用中`microApps.js`文件，设置不同的`entry`和`activeRules`

```js
const isProduction = process.env.NODE_ENV === "production";
let microApps = [
 {
    name: "sub-react",
    entry: isProduction ? "/sub-react/" : "//localhost:7778/sub-react/",
    activeRule: "/react",
  },
];
```

2. 修改子应用`sub-react`中的`package.json`的`homepage`，如下：

```js
{ 
  "name": "sub-react",
  "version": "0.1.0",
  "private": true,
  "homepage": "/sub-react",
  // ....
}
```

3. 修改路由文件，我们这里是`router/index.js`。

```js
const BASE_NAME = window.__POWERED_BY_QIANKUN__ ? "/react" : "/sub-react/";
const RouteView = () => (
  <BrowserRouter basename={BASE_NAME}>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/about' component={About}></Route>
    </Switch>
  </BrowserRouter>
);
```

4. 修改`ngnix`对应网站的`vhosts.conf`;

```conf
location /sub-react {
    root "D:/installed/resource/phpstudy_pro/WWW";
    index index.html index.htm;
    try_files $uri $uri/ /sub-react/index.html;
}
```


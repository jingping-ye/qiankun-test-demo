<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Sub-JSP|index</title>
  <link href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/3.4.1/css/bootstrap.min.css" rel="stylesheet" />
  <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/3.4.1/js/bootstrap.min.js"></script>
</head>
<body>
  <h1>Sub-JSP应用</h1>
  <div class="panel panel-default" style="width: 90%; margin: 20px auto 0;">
    <div class="panel-heading">技术栈</div>
    <div class="panel-body">
      <p>服务端渲染：JSP[2.3]</p>
      <p>前端底层框架：JQuery[3.5.1]</p>
      <p>前端UI框架：Bootstrap[3.4.1]</p>
    </div>
  </div>
  <div class="panel panel-default" style="width: 90%; margin: 20px auto 0;">
    <div class="panel-heading">测试数据</div>
    <div class="panel-body">
      <p>
        测试数据通信：
        <span>当前模块获取数据：<span id="user-info"></span></span>
        <button type="button" class="btn btn-primary" id="change-user-info">变更数据</button>
      </p>
      <p>
        测试当前应用路由管理：
        <button type="button" class="btn btn-primary" id="go-to-about-page">点击跳转到about页面</button>
      </p>
      <p>
        测试子应用互相跳转：
        <button type="button" class="btn btn-primary" id="go-to-angular-app">点击跳转到sub-html应用</button>
      </p>
    </div>
  </div>
  <script src="./entry.js" entry></script>
</body>
</html>
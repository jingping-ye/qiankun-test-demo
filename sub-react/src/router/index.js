import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "../views/home/home";
import About from "../views/about/about";
const BASE_NAME = window.__POWERED_BY_QIANKUN__ ? "/react" : "";
const RouteView = () => (
  <BrowserRouter basename={BASE_NAME}>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/about' component={About}></Route>
    </Switch>
  </BrowserRouter>
);

export default RouteView;

import { combineReducers, createStore } from "redux";
import app from "./appRedux";
import globalData from "./globalDataRedux";

const rootRedux = combineReducers({
  app,
  globalData,
});

export default createStore(rootRedux);

import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { Provider } from "react-redux";
import { LookingGlass } from "./LookingGlass";
import { configureStore } from "./store/configureStore";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <LookingGlass dispatchProp={store.dispatch} />
  </Provider>,
  document.getElementById("main-app")
);

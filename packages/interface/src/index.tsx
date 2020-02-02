import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { Provider } from "react-redux";
import { LookingGlass } from "./LookingGlass";
import { configureStore } from "./store/configureStore";
import { saveInterfaceKeyToLocalStorage } from "./utils/localStorage";

const store = configureStore();

store.subscribe(() => {
  saveInterfaceKeyToLocalStorage(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <LookingGlass dispatchProp={store.dispatch} />
  </Provider>,
  document.getElementById("main-app")
);

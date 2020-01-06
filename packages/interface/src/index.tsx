import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { Datasets } from "./components/datasets";
import { PingInternet } from "./components/pingInternet";

class LookingGlass extends React.PureComponent {
  public render() {
    return (
      <div className="main">
        <PingInternet />
        <Datasets />
      </div>
    );
  }
}

ReactDOM.render(<LookingGlass />, document.getElementById("main-app"));

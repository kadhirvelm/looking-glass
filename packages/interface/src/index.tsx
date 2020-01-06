import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { Datasets } from "./components/datasets";

class LookingGlass extends React.PureComponent {
  public render() {
    return (
      <div className="main">
        <Datasets />
      </div>
    );
  }
}

ReactDOM.render(<LookingGlass />, document.getElementById("main-app"));

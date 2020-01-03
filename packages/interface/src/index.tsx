import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
// import { IpcActions } from "@looking-glass/application-server";

class LookingGlass extends React.PureComponent {
  public componentDidMount() {
    // IpcActions.sendSampleAction({});
  }

  public render() {
    return <div className="main">Hello World!</div>;
  }
}

ReactDOM.render(<LookingGlass />, document.getElementById("main-app"));

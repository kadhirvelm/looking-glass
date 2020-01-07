import * as React from "react";
import { PingInternet } from "./components/pingInternet";
import { Datasets } from "./components/datasets";
import "./LookingGlass.scss";

export class LookingGlass extends React.PureComponent {
  public render() {
    return (
      <div className="main">
        <PingInternet />
        <Datasets />
      </div>
    );
  }
}

import * as React from "react";
import { Dispatch } from "redux";
import { PingInternet } from "./components/pingInternet";
import { Datasets } from "./components/datasets";
import {
  instantiateRendererListeners,
  removeListeners
} from "./store/listener";
import "./LookingGlass.scss";

interface IProps {
  dispatch: Dispatch;
}

export class LookingGlass extends React.PureComponent<IProps> {
  public componentDidMount() {
    const { dispatch } = this.props;
    instantiateRendererListeners(dispatch);
  }

  public componentWillUnmount() {
    removeListeners();
  }

  public render() {
    return (
      <div className="main">
        <PingInternet />
        <Datasets />
      </div>
    );
  }
}

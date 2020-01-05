import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import {
  RENDERER_ACTIONS,
  RENDERER_LISTENERS,
  IPingStatus
} from "@looking-glass/application-server";
import { Button } from "@blueprintjs/core";

interface IState {
  pingingStatus: IPingStatus | undefined;
}

class LookingGlass extends React.PureComponent<{}, IState> {
  public state: IState = {
    pingingStatus: undefined
  };

  public componentDidMount() {
    RENDERER_LISTENERS.pingStatus.listen(this.setPingStatus);
  }

  public componentWillUnmount() {
    RENDERER_LISTENERS.pingStatus.removeListener();
  }

  public render() {
    return (
      <div className="main">
        Current pinging state: {this.maybeRenderStatus()}
        <Button onClick={this.startPing} text="Start ping" />
        <Button onClick={this.stopPing} text="Stop ping" />
      </div>
    );
  }

  private maybeRenderStatus() {
    const { pingingStatus } = this.state;
    if (pingingStatus === undefined) {
      return "No status";
    }

    return pingingStatus.isPinging ? "Pinging" : "Not started";
  }

  private startPing = () => RENDERER_ACTIONS.startPing({});

  private stopPing = () => RENDERER_ACTIONS.stopPing({});

  private setPingStatus = (_: any, pingingStatus: IPingStatus) =>
    this.setState({ pingingStatus });
}

ReactDOM.render(<LookingGlass />, document.getElementById("main-app"));

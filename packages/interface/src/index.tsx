import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { IpcActions, IPingStatus } from "@looking-glass/application-server";

interface IState {
  pingingStatus: IPingStatus | undefined;
}

class LookingGlass extends React.PureComponent<{}, IState> {
  public state: IState = {
    pingingStatus: undefined
  };

  public componentDidMount() {
    IpcActions.listenForPingStatus(this.setPingStatus);
  }

  public componentWillUnmount() {
    IpcActions.removeListenForPingStatus(this.setPingStatus);
  }

  public render() {
    return (
      <div className="main">
        Current pinging state: {this.maybeRenderStatus()}
        <button onClick={this.startPing} type="button">
          Start ping
        </button>
        <button onClick={this.stopPing} type="button">
          Stop ping
        </button>
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

  private startPing = () => IpcActions.sendStartPing({});

  private stopPing = () => IpcActions.sendStopPing({});

  private setPingStatus = (_: any, pingingStatus: IPingStatus) =>
    this.setState({ pingingStatus });
}

ReactDOM.render(<LookingGlass />, document.getElementById("main-app"));

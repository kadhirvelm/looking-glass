import * as React from "react";
import {
  IPingStatus,
  RENDERER_LISTENERS,
  RENDERER_ACTIONS,
  IPingPercentComplete
} from "@looking-glass/application-server";
import { Button, ProgressBar } from "@blueprintjs/core";

interface IState {
  pingStatus?: IPingStatus;
  pingPercentComplete?: IPingPercentComplete;
}

export class PingInternet extends React.PureComponent<{}, IState> {
  public state: IState = {};

  public componentDidMount() {
    RENDERER_LISTENERS.pingStatus.listen(this.setPingStatus);
    RENDERER_LISTENERS.pingPercentComplete.listen(this.setPingPercentComplete);
    RENDERER_ACTIONS.getPingStatus({});
  }

  public componentWillUnmount() {
    RENDERER_LISTENERS.pingStatus.removeListener();
  }

  public render() {
    const { pingStatus, pingPercentComplete } = this.state;
    if (pingStatus !== undefined && pingStatus.isPinging) {
      return (
        <div className="ping-percent-container">
          <span>
            Is pinging! {JSON.stringify(pingStatus.pingRequest)} (
            {pingPercentComplete?.totalDatapointsCollected}/
            {pingStatus.pingRequest?.totalTimes})
          </span>
          {this.maybeRenderPingPercent()}
        </div>
      );
    }

    return (
      <div>
        <Button text="Collect data" onClick={this.startPinging} />
      </div>
    );
  }

  private maybeRenderPingPercent() {
    const { pingPercentComplete } = this.state;
    if (pingPercentComplete === undefined) {
      return null;
    }

    return <ProgressBar value={pingPercentComplete.percent} />;
  }

  private startPinging = () =>
    RENDERER_ACTIONS.startPing({ totalTimes: 2, timeBetweenPings: 5 });

  private setPingStatus = (_: any, newPingStatus: IPingStatus) => {
    const { pingStatus } = this.state;
    if (pingStatus?.isPinging && !newPingStatus.isPinging) {
      RENDERER_ACTIONS.requestDatasets({});
    }

    this.setState({ pingStatus: newPingStatus });
  };

  private setPingPercentComplete = (
    _: any,
    pingPercentComplete: IPingPercentComplete
  ) => this.setState({ pingPercentComplete });
}

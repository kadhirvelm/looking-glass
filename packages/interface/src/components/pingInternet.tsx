import * as React from "react";
import {
  IPingStatus,
  RENDERER_LISTENERS,
  RENDERER_ACTIONS,
  IPingPercentComplete
} from "@looking-glass/application-server";
import { Button, ProgressBar } from "@blueprintjs/core";
import { connect } from "react-redux";
import { IStoreState } from "../store/state";

interface IStateProps {
  pingStatus?: IPingStatus;
  pingPercentComplete?: IPingPercentComplete;
}

type IProps = IStateProps;

class UnconnectedPingInternet extends React.PureComponent<IProps> {
  public componentDidMount() {
    RENDERER_ACTIONS.getPingStatus({});
  }

  public componentDidUpdate(newProps: IProps) {
    const { pingStatus } = this.props;
    if (pingStatus?.isPinging && !newProps.pingStatus?.isPinging) {
      RENDERER_ACTIONS.requestDatasets({});
    }
  }

  public componentWillUnmount() {
    RENDERER_LISTENERS.pingStatus.removeListener();
  }

  public render() {
    const { pingStatus, pingPercentComplete } = this.props;
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
    const { pingPercentComplete } = this.props;
    if (pingPercentComplete === undefined) {
      return null;
    }

    return <ProgressBar value={pingPercentComplete.percent} />;
  }

  private startPinging = () =>
    RENDERER_ACTIONS.startPing({ totalTimes: 2, timeBetweenPings: 5 });
}

function mapStateToProps(state: IStoreState): IStateProps {
  return {
    pingPercentComplete: state.application.pingPercentComplete,
    pingStatus: state.application.pingStatus
  };
}

export const PingInternet = connect(mapStateToProps)(UnconnectedPingInternet);

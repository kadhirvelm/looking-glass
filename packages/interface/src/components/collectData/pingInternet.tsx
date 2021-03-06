import { Button, ProgressBar } from "@blueprintjs/core";
import {
  IPingPercentComplete,
  IPingStatus,
  RENDERER_ACTIONS
} from "@looking-glass/application-server";
import * as React from "react";
import { connect } from "react-redux";
import { Flexbox } from "../../common/flexbox";
import { IStoreState } from "../../store";

interface IStateProps {
  pingStatus?: IPingStatus;
  pingPercentComplete?: IPingPercentComplete;
}

type IProps = IStateProps;

class UnconnectedPingInternet extends React.PureComponent<IProps> {
  public componentDidMount() {
    RENDERER_ACTIONS.getPingStatus({});
  }

  public render() {
    const { pingStatus, pingPercentComplete } = this.props;
    if (pingStatus !== undefined && pingStatus.isPinging) {
      return (
        <Flexbox flexDirection="column" justifyContent="flex-end">
          <span>
            Collecting data (
            {pingPercentComplete?.totalDatapointsCollected ?? "?"}/
            {pingStatus.pingRequest?.totalTimes})
          </span>
          {this.maybeRenderPingPercent()}
        </Flexbox>
      );
    }

    return (
      <Flexbox justifyContent="flex-end">
        <Button onClick={this.startPinging} text="Collect data" />
      </Flexbox>
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

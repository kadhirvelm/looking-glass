import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { PingInternet } from "./components/pingInternet";
import { Datasets } from "./components/datasets";
import {
  instantiateRendererListeners,
  removeListeners
} from "./store/listener";
import "./LookingGlass.scss";
import { IUrlOptions, IRouteOption } from "./utils/typings";
import { HomeBar } from "./components/homeBar";
import { IStoreState } from "./store/state";

interface IOwnProps {
  /**
   * This is passed in so we can instanitate the renderer listeners once
   * after the main component mounts. We do not want actions dispatching
   * before the first full render cycle has completed.
   */
  dispatchProp: Dispatch;
}

interface IStoreProps {
  route: IRouteOption;
}

type IProps = IOwnProps & IStoreProps;

export class UnconnectedLookingGlass extends React.PureComponent<IProps> {
  public componentDidMount() {
    const { dispatchProp } = this.props;
    instantiateRendererListeners(dispatchProp);
  }

  public componentWillUnmount() {
    removeListeners();
  }

  public render() {
    return (
      <div className="main">
        <HomeBar />
        {this.renderPage()}
      </div>
    );
  }

  private renderPage() {
    const {
      route: { url }
    } = this.props;

    switch (url) {
      case IUrlOptions.HOME:
        return this.renderHome();
      case IUrlOptions.COLLECT_DATA:
        return this.renderCollectData();
      case IUrlOptions.ANALYZE_DATA:
        return this.renderAnalyzeData();
      default:
        return null;
    }
  }

  private renderHome() {
    return <div className="main">Welcome to looking glass.</div>;
  }

  private renderCollectData() {
    return (
      <div className="main">
        <PingInternet />
        <Datasets />
      </div>
    );
  }

  private renderAnalyzeData() {
    return <div className="main">To be implemented.</div>;
  }
}

function mapStateToProps(state: IStoreState): IStoreProps {
  return {
    route: state.interface.route
  };
}

export const LookingGlass = connect(mapStateToProps)(UnconnectedLookingGlass);

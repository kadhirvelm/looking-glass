import * as React from "react";
import { Dispatch } from "redux";
import { PingInternet } from "./components/pingInternet";
import { Datasets } from "./components/datasets";
import {
  instantiateRendererListeners,
  removeListeners
} from "./store/listener";
import "./LookingGlass.scss";
import { IUrlOptions, IRouteOption } from "./utils/typings";
import { HomeBar } from "./components/homeBar";

interface IProps {
  dispatch: Dispatch;
}

interface IState {
  route: IRouteOption;
}

export class LookingGlass extends React.PureComponent<IProps, IState> {
  public state: IState = {
    route: { url: IUrlOptions.HOME }
  };

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
        <HomeBar onChange={this.handlePageChange} />
        {this.renderPage()}
      </div>
    );
  }

  private renderPage() {
    const {
      route: { url }
    } = this.state;

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

  private handlePageChange = (route: IRouteOption) => this.setState({ route });
}

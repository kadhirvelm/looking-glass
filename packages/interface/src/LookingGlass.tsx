import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AnalyzeData } from "./components/analyzeData/analyzeData";
import { CollectData } from "./components/collectData/collectData";
import { Home } from "./components/home/home";
import { HomeBar } from "./components/homeBar";
import "./LookingGlass.scss";
import {
  instantiateRendererListeners,
  removeListeners
} from "./store/listener";
import { IStoreState } from "./store/state";
import { IRouteOption, IUrlOptions } from "./utils/typings";
import { Flexbox } from "./common/flexbox";

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
    const {
      route: { url }
    } = this.props;

    return (
      <div className="looking-glass-app">
        <div className="draggable-bar" />
        <HomeBar />
        <Flexbox className="fade-in" flex="1" key={url}>
          {this.renderCurrentRoutePage()}
        </Flexbox>
      </div>
    );
  }

  private renderCurrentRoutePage() {
    const {
      route: { url }
    } = this.props;

    switch (url) {
      case IUrlOptions.HOME:
        return <Home />;
      case IUrlOptions.COLLECT_DATA:
        return <CollectData />;
      case IUrlOptions.ANALYZE_DATA:
        return <AnalyzeData />;
      default:
        return null;
    }
  }
}

function mapStateToProps(state: IStoreState): IStoreProps {
  return {
    route: state.interface.route
  };
}

export const LookingGlass = connect(mapStateToProps)(UnconnectedLookingGlass);

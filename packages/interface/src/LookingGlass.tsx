import { Classes } from "@blueprintjs/core";
import classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Flexbox } from "./common/flexbox";
import { VerifyDialog } from "./common/verifyDialog";
import { AnalyzeData } from "./components/analyzeData/analyzeData";
import { CollectData } from "./components/collectData/collectData";
import { MergeDatasetsDialog } from "./components/collectData/mergeDatasets/mergeDatasetsDialog";
import { Home } from "./components/home/home";
import { HomeBar } from "./components/homeBar";
import {
  instantiateRendererListeners,
  removeListeners
} from "./store/listener";
import { IStoreState } from "./store/state";
import { IRouteOption, IUrlOptions } from "./utils/typings";
import styles from "./LookingGlass.module.scss";

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
      <div className={classNames(styles.lookingGlassApp, Classes.DARK)}>
        <div className={styles.draggableBar} />
        <HomeBar />
        <Flexbox className={styles.fadeIn} flex="1" key={url}>
          {this.renderCurrentRoutePage()}
        </Flexbox>
        {this.renderGlobalDialogs()}
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

  private renderGlobalDialogs() {
    return (
      <>
        <VerifyDialog />
        <MergeDatasetsDialog />
      </>
    );
  }
}

function mapStateToProps(state: IStoreState): IStoreProps {
  return {
    route: state.interface.route
  };
}

export const LookingGlass = connect(mapStateToProps)(UnconnectedLookingGlass);

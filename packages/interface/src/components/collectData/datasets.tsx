import { NonIdealState, Spinner, Button } from "@blueprintjs/core";
import {
  ISingleDataset,
  RENDERER_ACTIONS
} from "@looking-glass/application-server";
import classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import ReactJson from "react-json-view";
import { Dispatch } from "redux";
import { IStoreState } from "../../store/state";
import "./datasets.scss";
import { Flexbox } from "../../common/flexbox";
import { PingInternet } from "./pingInternet";
import { SET_SINGLE_DATASET } from "../../store";

interface IStateProps {
  datasetNames?: string[];
  singleDatasetInfo?: ISingleDataset;
}

interface IDispatchProps {
  resetSelectedDataset: () => void;
}

type IProps = IStateProps & IDispatchProps;

class UnconnectedDatasets extends React.PureComponent<IProps> {
  public componentDidMount() {
    RENDERER_ACTIONS.requestDatasets({});
  }

  public render() {
    const { datasetNames } = this.props;
    if (datasetNames === undefined) {
      return <Spinner />;
    }

    return (
      <Flexbox flex="1">
        {this.renderDatasetTable(datasetNames)}
        {this.renderSingleDatasetInfo()}
      </Flexbox>
    );
  }

  private renderDatasetTable(datasetNames: string[]) {
    return (
      <Flexbox flex="1" flexDirection="column" justifyContent="space-between">
        <div>
          {this.renderHeader()}
          {this.maybeRenderTable(datasetNames)}
        </div>
        <PingInternet />
      </Flexbox>
    );
  }

  private renderHeader() {
    const { datasetNames } = this.props;
    return (
      <Flexbox justifyContent="space-between">
        <span className="dataset-header-text">
          Dataset name ({datasetNames?.length})
        </span>
      </Flexbox>
    );
  }

  private maybeRenderTable(datasetNames: string[]) {
    if (datasetNames.length === 0) {
      return (
        <NonIdealState
          description="Please gather some datasets before you can analyze them."
          icon="warning-sign"
          title="No datasets found"
        />
      );
    }

    return (
      <div className="datasets-table">
        {datasetNames.map(this.renderSingleDatasetName)}
      </div>
    );
  }

  private renderSingleDatasetName = (datasetName: string) => {
    const { singleDatasetInfo } = this.props;
    return (
      <Flexbox
        alignItems="center"
        className={classNames("single-dataset", {
          "selected-dataset": singleDatasetInfo?.datasetName === datasetName
        })}
        key={datasetName}
        justifyContent="space-between"
        onClick={this.requestSingleDataset(datasetName)}
      >
        <span>{datasetName}</span>
        <div>
          <Button disabled icon="merge-columns" minimal />
          <Button disabled icon="cross" intent="danger" minimal />
        </div>
      </Flexbox>
    );
  };

  private renderSingleDatasetInfo() {
    const { singleDatasetInfo } = this.props;
    if (singleDatasetInfo === undefined) {
      return (
        <Flexbox className="json-container" flex="2">
          <NonIdealState
            description={
              <div className="dataset-non-ideal">
                Select a dataset to the left to explore.
              </div>
            }
            icon="search"
            title="No dataset selected."
          />
        </Flexbox>
      );
    }

    return (
      <Flexbox className="json-container" flex="2">
        <ReactJson
          src={singleDatasetInfo.data}
          style={{ backgroundColor: "#1F2833" }}
          theme="monokai"
        />
      </Flexbox>
    );
  }

  private requestSingleDataset(datasetName: string) {
    return () => {
      const { resetSelectedDataset, singleDatasetInfo } = this.props;
      if (singleDatasetInfo?.datasetName === datasetName) {
        resetSelectedDataset();
      } else {
        RENDERER_ACTIONS.requestSingleDataset({ name: datasetName });
      }
    };
  }
}

function mapStateToProps(state: IStoreState): IStateProps {
  return {
    datasetNames: state.application.datasets?.datasetNames.sort(),
    singleDatasetInfo: state.application.singleDatasetInfo
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return {
    resetSelectedDataset: () => dispatch(SET_SINGLE_DATASET.create(undefined))
  };
}

export const Datasets = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedDatasets);

import { NonIdealState, Spinner } from "@blueprintjs/core";
import {
  ISingleDataset,
  RENDERER_ACTIONS
} from "@looking-glass/application-server";
import * as React from "react";
import { connect } from "react-redux";
import { IStoreState } from "../store/state";
import "./datasets.scss";

interface IStateProps {
  datasetNames?: string[];
  singleDatasetInfo?: ISingleDataset;
}

type IProps = IStateProps;

class UnconnectedDatasets extends React.PureComponent<IProps> {
  public componentDidMount() {
    RENDERER_ACTIONS.requestDatasets({});
  }

  public render() {
    const { datasetNames } = this.props;
    if (datasetNames === undefined) {
      return <Spinner />;
    }

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
      <div className="datasets-container">
        <span>{datasetNames.length} datasets</span>
        {datasetNames.map(dataset => (
          <div key={dataset} onClick={this.requestSingleDataset(dataset)}>
            {dataset}
          </div>
        ))}
        {this.maybeRenderSingleDatasetInfo()}
      </div>
    );
  }

  private requestSingleDataset(datasetName: string) {
    return () => {
      RENDERER_ACTIONS.requestSingleDataset({ name: datasetName });
    };
  }

  private maybeRenderSingleDatasetInfo() {
    const { singleDatasetInfo } = this.props;
    if (singleDatasetInfo === undefined) {
      return null;
    }

    return <div>{JSON.stringify(singleDatasetInfo)}</div>;
  }
}

function mapStateToProps(state: IStoreState): IStateProps {
  return {
    datasetNames: state.application.datasets?.datasetNames,
    singleDatasetInfo: state.application.singleDatasetInfo
  };
}

export const Datasets = connect(mapStateToProps)(UnconnectedDatasets);

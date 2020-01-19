import { NonIdealState, Spinner, Button } from "@blueprintjs/core";
import {
  ISingleDataset,
  RENDERER_ACTIONS
} from "@looking-glass/application-server";
import classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import ReactJson from "react-json-view";
import { IStoreState } from "../../store/state";
import "./datasets.scss";
import { Flexbox } from "../../common/flexbox";

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
      <Flexbox className="datasets-container" flex="1" flexDirection="column">
        {this.renderHeader()}
        <div className="datasets-table">
          {datasetNames.map(this.renderSingleDatasetName)}
        </div>
        {this.maybeRenderSingleDatasetInfo()}
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

    return (
      <div className="json-container">
        <ReactJson
          src={singleDatasetInfo.data}
          style={{ backgroundColor: "#1F2833" }}
          theme="codeschool"
        />
      </div>
    );
  }
}

function mapStateToProps(state: IStoreState): IStateProps {
  return {
    datasetNames: state.application.datasets?.datasetNames,
    singleDatasetInfo: state.application.singleDatasetInfo
  };
}

export const Datasets = connect(mapStateToProps)(UnconnectedDatasets);

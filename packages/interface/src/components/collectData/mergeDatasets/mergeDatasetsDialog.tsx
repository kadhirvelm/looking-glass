import * as React from "react";
import { RENDERER_ACTIONS } from "@looking-glass/application-server";
import { Dialog, Classes, Button, NonIdealState } from "@blueprintjs/core";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import classNames from "classnames";
import { IStoreState } from "../../../store/state";
import { DIALOGS } from "../../../typings/constants";
import { CLOSE_MERGE_DIALOG, MERGING_DATASETS } from "../../../store";
import "./mergeDatasetsDialog.scss";

interface IStoreProps {
  datasetNames?: string[];
  isMergeDatasetOpen: boolean;
  isMergeOngoing: boolean;
}

interface IDispatchProps {
  closeDialog: () => void;
  setRequestMerge: () => void;
}

type IProps = IStoreProps & IDispatchProps;

interface IState {
  selectedDatasets: Set<string>;
}

class UnconnectedMergeDatasetsDialog extends React.PureComponent<
  IProps,
  IState
> {
  public state: IState = {
    selectedDatasets: new Set()
  };

  public componentDidUpdate(prevProps: IProps) {
    const { closeDialog, isMergeOngoing } = this.props;
    if (!isMergeOngoing && prevProps.isMergeOngoing) {
      this.setState({ selectedDatasets: new Set() }, closeDialog);
    }
  }

  public render() {
    const { isMergeDatasetOpen, closeDialog, isMergeOngoing } = this.props;
    const { selectedDatasets } = this.state;

    return (
      <Dialog isOpen={isMergeDatasetOpen} onClose={closeDialog}>
        <div className={Classes.DIALOG_BODY}>
          <div className="merge-dialog-select-datasets-title">
            Select datasets to merge. Please note the datasets will be merged in
            the order you specify.
          </div>
          {this.maybeRenderDatasetTable()}
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button
              disabled={selectedDatasets.size < 1}
              onClick={this.mergeDatasets}
              loading={isMergeOngoing}
              text={`Merge ${selectedDatasets.size} datasets`}
            />
          </div>
        </div>
      </Dialog>
    );
  }

  private maybeRenderDatasetTable() {
    const { datasetNames } = this.props;
    if (datasetNames?.length === 0) {
      return <NonIdealState icon="warning-sign" title="No datasets" />;
    }

    return (
      <div className="merge-dialog-dataset-container">
        {datasetNames?.map(this.renderSingleDataset)}
      </div>
    );
  }

  private renderSingleDataset = (datasetName: string) => {
    const { selectedDatasets } = this.state;
    return (
      <div
        className={classNames("merge-dialog-dataset", {
          "merge-dialog-selected-dataset": selectedDatasets.has(datasetName)
        })}
        onClick={this.toggleDatasetSelected(datasetName)}
      >
        {datasetName}
      </div>
    );
  };

  private toggleDatasetSelected = (datasetName: string) => () => {
    const { selectedDatasets } = this.state;
    const newSelectedDatasetsSet = new Set(selectedDatasets);

    if (selectedDatasets.has(datasetName)) {
      newSelectedDatasetsSet.delete(datasetName);
    } else {
      newSelectedDatasetsSet.add(datasetName);
    }

    this.setState({ selectedDatasets: newSelectedDatasetsSet });
  };

  private mergeDatasets = () => {
    const { setRequestMerge } = this.props;
    const { selectedDatasets } = this.state;

    setRequestMerge();
    RENDERER_ACTIONS.requestMergeDatasets({
      datasetNames: Array.from(selectedDatasets)
    });
  };
}

function mapStateToProps(store: IStoreState): IStoreProps {
  return {
    datasetNames: store.application.datasets?.datasetNames,
    isMergeDatasetOpen: store.interface.openDialog === DIALOGS.MERGE_DIALOG,
    isMergeOngoing: store.application.isMergeOngoing
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return {
    closeDialog: () => dispatch(CLOSE_MERGE_DIALOG.create()),
    setRequestMerge: () => dispatch(MERGING_DATASETS.create())
  };
}

export const MergeDatasetsDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedMergeDatasetsDialog);

import { Button, NonIdealState, Spinner } from "@blueprintjs/core";
import {
  ISingleDataset,
  RENDERER_ACTIONS
} from "@looking-glass/application-server";
import classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Flexbox } from "../../common/flexbox";
import {
  IStoreState,
  OPEN_VERIFY_DIALOG,
  SET_SINGLE_DATASET
} from "../../store";
import { OPEN_MERGE_DIALOG } from "../../store/interface/actions";
import { IVerifyDialogProps } from "../../typings/store";
import { PingInternet } from "./pingInternet";
import styles from "./datasets.module.scss";
import { SingleDataset } from "./singleDataset";

interface IStateProps {
  datasetNames?: string[];
  singleDatasetInfo?: ISingleDataset;
}

interface IDispatchProps {
  openMergeDialog: () => void;
  openVerifyDialog: (verifyDialogProps: IVerifyDialogProps) => void;
  resetSelectedDataset: () => void;
}

type IProps = IStateProps & IDispatchProps;

class UnconnectedDatasets extends React.PureComponent<IProps> {
  public componentDidMount() {
    RENDERER_ACTIONS.requestDatasets({});
  }

  public render() {
    const { datasetNames, singleDatasetInfo } = this.props;
    if (datasetNames === undefined) {
      return <Spinner />;
    }

    return (
      <Flexbox flex="1">
        {this.renderDatasetTable(datasetNames)}
        <Flexbox className={styles.singleDatasetContainer} flex="2">
          <SingleDataset key={singleDatasetInfo?.datasetName} />
        </Flexbox>
      </Flexbox>
    );
  }

  private renderDatasetTable(datasetNames: string[]) {
    return (
      <Flexbox
        className={styles.leftContainer}
        flex="1"
        flexDirection="column"
        justifyContent="space-between"
      >
        <div>
          {this.renderHeader()}
          {this.maybeRenderTable(datasetNames)}
        </div>
        <div className={styles.pingInternetContainer}>
          <PingInternet />
        </div>
      </Flexbox>
    );
  }

  private renderHeader() {
    const { datasetNames, openMergeDialog } = this.props;
    return (
      <Flexbox
        alignItems="center"
        className={styles.headerContainer}
        justifyContent="space-between"
      >
        <span className={styles.datasetHeaderText}>
          Dataset name ({datasetNames?.length})
        </span>
        <span>
          <Button
            icon="merge-columns"
            minimal
            onClick={openMergeDialog}
            text="Merge datasets"
          />
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
      <div className={styles.datasetsTable}>
        {datasetNames.map(this.renderSingleDatasetName)}
      </div>
    );
  }

  private renderSingleDatasetName = (datasetName: string) => {
    const { singleDatasetInfo } = this.props;
    return (
      <Flexbox
        alignItems="center"
        className={classNames(styles.singleDataset, {
          [styles.selectedDataset]:
            singleDatasetInfo?.datasetName === datasetName
        })}
        key={datasetName}
        justifyContent="space-between"
        onClick={this.requestSingleDataset(datasetName)}
      >
        <span>{datasetName}</span>
        <div>
          <Button
            icon="cross"
            intent="danger"
            minimal
            onClick={this.handleDeleteDataset(datasetName)}
          />
        </div>
      </Flexbox>
    );
  };

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

  private handleDeleteDataset = (datasetName: string) => () => {
    const { openVerifyDialog } = this.props;
    openVerifyDialog({
      confirmButtonIntent: "danger",
      confirmText: "Delete the dataset",
      description: (
        <span>
          Are you sure you want to delete <b>{datasetName}</b>? This action is
          irreversible.
        </span>
      ),
      icon: "delete",
      onConfirm: this.onConfirmation(datasetName),
      title: "Confirm deleting dataset"
    });
  };

  private onConfirmation = (datasetName: string) => () => {
    const { resetSelectedDataset } = this.props;
    RENDERER_ACTIONS.requestDeleteDataset({ datasetNames: [datasetName] });
    resetSelectedDataset();
  };
}

function mapStateToProps(state: IStoreState): IStateProps {
  return {
    datasetNames: state.application.datasets?.datasetNames.sort(),
    singleDatasetInfo: state.application.singleDatasetInfo
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return {
    ...bindActionCreators(
      {
        openMergeDialog: OPEN_MERGE_DIALOG.create,
        openVerifyDialog: OPEN_VERIFY_DIALOG.create
      },
      dispatch
    ),
    resetSelectedDataset: () => dispatch(SET_SINGLE_DATASET.create(undefined))
  };
}

export const Datasets = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedDatasets);

import { IDatasets, RENDERER_ACTIONS } from "@looking-glass/application-server";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Flexbox } from "../../common/flexbox";
import { SET_ANALYZE_DATASET } from "../../store";
import { IStoreState } from "../../store/state";
import styles from "./analyzeData.module.scss";

interface IStateProps {
  analyzeDatasetName: string | undefined;
  datasets: IDatasets | undefined;
}

interface IDispatchProps {
  setAnalyzeDatasetName: (datasetName: string) => void;
}

type IProps = IStateProps & IDispatchProps;

class UnconnectedAnalyzeData extends React.PureComponent<IProps> {
  public componentDidMount() {
    RENDERER_ACTIONS.requestDatasets({});
  }

  public render() {
    const { analyzeDatasetName } = this.props;
    if (analyzeDatasetName === undefined) {
      return this.selectDataset();
    }

    return (
      <Flexbox alignItems="center" flex="1" justifyContent="center">
        To be implemented.
      </Flexbox>
    );
  }

  private selectDataset() {
    const { datasets } = this.props;
    if (datasets === undefined) {
      return null;
    }

    return (
      <Flexbox alignItems="center" flex="1" justifyContent="center">
        <Flexbox flexDirection="column">
          <div className={styles.title}>Select a dataset to analyze:</div>
          <Flexbox className={styles.datasetsContainer} flexDirection="column">
            {datasets.datasetNames.map(this.renderDatasetOption)}
          </Flexbox>
        </Flexbox>
      </Flexbox>
    );
  }

  private renderDatasetOption = (datasetName: string) => (
    <div
      className={styles.singleDataset}
      onClick={this.setAnalyzeDatasetName(datasetName)}
    >
      {datasetName}
    </div>
  );

  private setAnalyzeDatasetName = (datasetName: string) => () => {
    const { setAnalyzeDatasetName } = this.props;
    setAnalyzeDatasetName(datasetName);
  };
}

function mapStateToProps(state: IStoreState): IStateProps {
  return {
    analyzeDatasetName: state.interface.analyzeDatasetName,
    datasets: state.application.datasets
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return bindActionCreators(
    { setAnalyzeDatasetName: SET_ANALYZE_DATASET.create },
    dispatch
  );
}

export const AnalyzeData = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedAnalyzeData);

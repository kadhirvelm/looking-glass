import * as React from "react";
import {
  ISingleDataset,
  RENDERER_ACTIONS
} from "@looking-glass/application-server";
import { connect } from "react-redux";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { Button } from "@blueprintjs/core";
import { Dispatch } from "redux";
import { Flexbox } from "../../common/flexbox";
import { IStoreState } from "../../store/state";
import styles from "./chartSingleDataset.module.scss";
import { SET_ANALYZE_DATASET } from "../../store/interface/actions";

interface IOwnProps {
  analyzeDatasetName: string;
}

interface IStateProps {
  singleDataset: ISingleDataset | undefined;
}

interface IDispatchProps {
  resetDatasetSelection: () => void;
}

type IProps = IOwnProps & IStateProps & IDispatchProps;

class UnconnectedChartSingleDataset extends React.PureComponent<IProps> {
  public componentDidMount() {
    const { analyzeDatasetName } = this.props;
    if (!this.singleDatasetIsAnalyzeDataset()) {
      RENDERER_ACTIONS.requestSingleDataset({
        name: analyzeDatasetName
      });
    }
  }

  public render() {
    if (!this.singleDatasetIsAnalyzeDataset()) {
      return null;
    }

    const { resetDatasetSelection } = this.props;
    return (
      <Flexbox alignItems="center" flex="1" justifyContent="center">
        <Button
          className={styles.resetDataset}
          onClick={resetDatasetSelection}
          text="Select new dataset"
        />
        <LineChart width={1000} height={750} data={this.getData()}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
        </LineChart>
      </Flexbox>
    );
  }

  private getData = () => {
    const { singleDataset } = this.props;

    return Object.values(singleDataset?.dataFile.data).map(
      (singleDataPoint: any, index: number) => ({
        name: index,
        uv: singleDataPoint.speedTest.response.speeds.download,
        pv: singleDataPoint.speedTest.response.speeds.upload
      })
    );
  };

  private singleDatasetIsAnalyzeDataset = () => {
    const { analyzeDatasetName, singleDataset } = this.props;
    return (
      singleDataset !== undefined &&
      singleDataset.datasetName === analyzeDatasetName
    );
  };
}

function mapStateToProps(state: IStoreState): IStateProps {
  return {
    singleDataset: state.application.singleDatasetInfo
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return {
    resetDatasetSelection: () => dispatch(SET_ANALYZE_DATASET.create(undefined))
  };
}

const ChartSingleDataset = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedChartSingleDataset);

export default ChartSingleDataset;

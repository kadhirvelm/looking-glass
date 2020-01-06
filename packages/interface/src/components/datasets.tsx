import * as React from "react";
import { Spinner, NonIdealState } from "@blueprintjs/core";
import {
  IDatasets,
  RENDERER_LISTENERS,
  RENDERER_ACTIONS,
  ISingleDataset
} from "@looking-glass/application-server";
import "./datasets.scss";

interface IState {
  datasets: string[] | undefined;
  singleDataset?: ISingleDataset;
}

export class Datasets extends React.PureComponent<{}, IState> {
  public state: IState = {
    datasets: undefined
  };

  public componentDidMount() {
    RENDERER_LISTENERS.getDatasets.listen(this.setDatasets);
    RENDERER_LISTENERS.getSingleDataset.listen(this.setSingleDataset);
    RENDERER_ACTIONS.requestDatasets({});
  }

  public componentWillUnmount() {
    RENDERER_LISTENERS.getDatasets.removeListener();
    RENDERER_LISTENERS.getSingleDataset.removeListener();
  }

  public render() {
    const { datasets } = this.state;
    if (datasets === undefined) {
      return <Spinner />;
    }

    if (datasets.length === 0) {
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
        <span>{datasets.length} datasets</span>
        {datasets.map(dataset => (
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
    const { singleDataset } = this.state;
    if (singleDataset === undefined) {
      return null;
    }

    return <div>{JSON.stringify(singleDataset)}</div>;
  }

  private setDatasets = (_: any, datasets: IDatasets) =>
    this.setState({ datasets: datasets.datasetNames });

  private setSingleDataset = (_: any, singleDataset: ISingleDataset) =>
    this.setState({ singleDataset });
}

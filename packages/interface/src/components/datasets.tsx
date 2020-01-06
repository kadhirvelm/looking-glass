import * as React from "react";
import { Spinner, NonIdealState } from "@blueprintjs/core";
import {
  IDatasets,
  RENDERER_LISTENERS,
  RENDERER_ACTIONS
} from "@looking-glass/application-server";
import "./datasets.scss";

interface IState {
  datasets: string[] | undefined;
}

export class Datasets extends React.PureComponent<{}, IState> {
  public state: IState = {
    datasets: undefined
  };

  public componentDidMount() {
    RENDERER_LISTENERS.getDatasets.listen(this.setDatasets);
    RENDERER_ACTIONS.requestDatasets({});
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
        {datasets.map(dataset => (
          <div key={dataset} onClick={this.requestSingleDataset(dataset)}>
            {dataset}
          </div>
        ))}
      </div>
    );
  }

  private requestSingleDataset(datasetName: string) {
    return () => {
      RENDERER_ACTIONS.requestSingleDataset({ name: datasetName });
    };
  }

  private setDatasets = (_: any, datasets: IDatasets) =>
    this.setState({ datasets: datasets.datasetNames });
}

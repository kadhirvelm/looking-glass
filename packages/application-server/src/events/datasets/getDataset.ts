import { getDatasets } from "@looking-glass/application-scripts";
import { RendererListener, BasicAction } from "../../classes";
import { IDatasets } from "../../typings";

enum CHANNELS {
  GET_DATASETS = "get-datasets",
  REQUEST_DATASETS = "request-datasetst"
}

export const GET_DATASETS = new RendererListener<IDatasets>(
  CHANNELS.GET_DATASETS
);

export const REQUEST_DATASETS = new BasicAction<{}>(
  CHANNELS.REQUEST_DATASETS,
  event => {
    const datasetNames = getDatasets();
    event.sender.send(
      GET_DATASETS.channel,
      GET_DATASETS.verifyArgs({ datasetNames })
    );
  }
);

import { getSingleDataset } from "@looking-glass/application-scripts";
import { BasicAction, RendererListener } from "../../classes";
import { ISingleDataset, ISingleDatasetRequest } from "../../typings";

enum CHANNELS {
  GET_SINGLE_DATASET = "get-single-dataset",
  REQUEST_SINGLE_DATASET = "request-single-dataset"
}

export const GET_SINGLE_DATASET = new RendererListener<ISingleDataset>(
  CHANNELS.GET_SINGLE_DATASET
);

export const REQUEST_SINGLE_DATASET = new BasicAction<ISingleDatasetRequest>(
  CHANNELS.REQUEST_SINGLE_DATASET,
  (event, datasetName) => {
    const singleDataset = getSingleDataset(datasetName.name);
    event.sender.send(
      GET_SINGLE_DATASET.channel,
      GET_SINGLE_DATASET.verifyArgs({
        data: singleDataset,
        datasetName: datasetName.name
      })
    );
  }
);

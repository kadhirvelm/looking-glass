import {
  getDatasets,
  deleteDatasets
} from "@looking-glass/application-scripts";
import { BasicAction } from "../../classes/basicActions";
import { IDeleteDatasetsRequest } from "../../typings";
import { GET_DATASETS } from "./getDataset";

enum CHANNELS {
  REQUEST_DELETE_DATASET = "request-delete-dataset"
}

export const REQUEST_DELETE_DATASET = new BasicAction<IDeleteDatasetsRequest>(
  CHANNELS.REQUEST_DELETE_DATASET,
  (event, { datasetNames }) => {
    deleteDatasets(datasetNames);
    const remainingDatasetNames = getDatasets();
    event.sender.send(
      GET_DATASETS.channel,
      GET_DATASETS.verifyArgs({ datasetNames: remainingDatasetNames })
    );
  }
);

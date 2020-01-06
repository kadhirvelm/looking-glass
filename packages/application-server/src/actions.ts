import {
  getDatasets,
  getSingleDataset
} from "@looking-glass/application-scripts";
import { BasicAction, RendererListener } from "./classes";
import {
  IPing,
  IPingStatus,
  IDatasets,
  ISingleDatasetRequest,
  ISingleDataset
} from "./typings";

enum CHANNELS {
  START_PING = "start-ping",
  STOP_PING = "stop-ping",
  PING_STATUS = "ping-status",

  GET_DATASETS = "get-datasets",
  REQUEST_DATASETS = "request-datasetst",

  GET_SINGLE_DATASET = "get-single-dataset",
  REQUEST_SINGLE_DATASET = "request-single-dataset"
}

/**
 * Actions
 */
const PING_STATUS = new RendererListener<IPingStatus>(CHANNELS.PING_STATUS);

const START_PING = new BasicAction<IPing>(CHANNELS.START_PING, event => {
  event.sender.send(
    PING_STATUS.channel,
    PING_STATUS.verifyArgs({ isPinging: true })
  );
});

const STOP_PING = new BasicAction<IPing>(CHANNELS.STOP_PING, event => {
  event.sender.send(
    PING_STATUS.channel,
    PING_STATUS.verifyArgs({ isPinging: false })
  );
});

const GET_DATASETS = new RendererListener<IDatasets>(CHANNELS.GET_DATASETS);

const REQUEST_DATASETS = new BasicAction<{}>(
  CHANNELS.REQUEST_DATASETS,
  event => {
    const datasetNames = getDatasets();
    event.sender.send(
      GET_DATASETS.channel,
      GET_DATASETS.verifyArgs({ datasetNames })
    );
  }
);

const GET_SINGLE_DATASET = new RendererListener<ISingleDataset>(
  CHANNELS.GET_SINGLE_DATASET
);

const REQUEST_SINGLE_DATASET = new BasicAction<ISingleDatasetRequest>(
  CHANNELS.REQUEST_SINGLE_DATASET,
  (event, datasetName) => {
    const singleDataset = getSingleDataset(datasetName.name);
    event.sender.send(
      GET_SINGLE_DATASET.channel,
      GET_SINGLE_DATASET.verifyArgs(singleDataset)
    );
  }
);

/**
 * Boilerplate
 */
export const MAIN_ACTIONS = {};

export const MAIN_LISTENERS = [
  REQUEST_DATASETS.listen,
  REQUEST_SINGLE_DATASET.listen,
  START_PING.listen,
  STOP_PING.listen
];

export const RENDERER_ACTIONS = {
  requestDatasets: REQUEST_DATASETS.sendAction,
  requestSingleDataset: REQUEST_SINGLE_DATASET.sendAction,
  startPing: START_PING.sendAction,
  stopPing: STOP_PING.sendAction
};

export const RENDERER_LISTENERS = {
  getDatasets: GET_DATASETS,
  getSingleDataset: GET_SINGLE_DATASET,
  pingStatus: PING_STATUS
};

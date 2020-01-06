import {
  getDatasets,
  getSingleDataset,
  pingNTimes
} from "@looking-glass/application-scripts";
import { BasicAction, RendererListener } from "./classes";
import {
  IPing,
  IPingStatus,
  IDatasets,
  ISingleDatasetRequest,
  ISingleDataset,
  IPingPercentComplete
} from "./typings";

enum CHANNELS {
  GET_PING_STATUS = "get-ping-status",
  PING_STATUS = "ping-status",
  START_PING = "start-ping",

  PING_PERCENT_COMPLETE = "ping-percent-complete",

  GET_DATASETS = "get-datasets",
  REQUEST_DATASETS = "request-datasetst",

  GET_SINGLE_DATASET = "get-single-dataset",
  REQUEST_SINGLE_DATASET = "request-single-dataset"
}

/**
 * Actions
 */
const PING_STATUS = new RendererListener<IPingStatus>(CHANNELS.PING_STATUS);

const PING_PERCENT_COMPLETE = new RendererListener<IPingPercentComplete>(
  CHANNELS.PING_PERCENT_COMPLETE
);

let currentPingStatus: IPingStatus = { isPinging: false };

const START_PING = new BasicAction<IPing>(
  CHANNELS.START_PING,
  async (event, pingRequest) => {
    currentPingStatus = { isPinging: true, pingRequest };
    event.sender.send(
      PING_STATUS.channel,
      PING_STATUS.verifyArgs(currentPingStatus)
    );

    await pingNTimes(
      pingRequest.totalTimes,
      pingRequest.timeBetweenPings,
      (percent: number, totalDatapointsCollected: number) => {
        event.sender.send(
          PING_PERCENT_COMPLETE.channel,
          PING_PERCENT_COMPLETE.verifyArgs({
            percent,
            totalDatapointsCollected
          })
        );
      }
    );

    currentPingStatus = { isPinging: false };
    event.sender.send(
      PING_STATUS.channel,
      PING_STATUS.verifyArgs(currentPingStatus)
    );
  }
);

const GET_PING_STATUS = new BasicAction<{}>(CHANNELS.GET_PING_STATUS, event => {
  event.sender.send(
    PING_STATUS.channel,
    PING_STATUS.verifyArgs(currentPingStatus)
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
  GET_PING_STATUS.listen
];

export const RENDERER_ACTIONS = {
  getPingStatus: GET_PING_STATUS.sendAction,
  requestDatasets: REQUEST_DATASETS.sendAction,
  requestSingleDataset: REQUEST_SINGLE_DATASET.sendAction,
  startPing: START_PING.sendAction
};

export const RENDERER_LISTENERS = {
  getDatasets: GET_DATASETS,
  getSingleDataset: GET_SINGLE_DATASET,
  pingStatus: PING_STATUS,
  pingPercentComplete: PING_PERCENT_COMPLETE
};

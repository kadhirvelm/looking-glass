import {
  REQUEST_DATASETS,
  REQUEST_SINGLE_DATASET,
  GET_DATASETS,
  GET_SINGLE_DATASET
} from "./events";
import {
  START_PING,
  GET_PING_STATUS,
  PING_STATUS,
  PING_PERCENT_COMPLETE
} from "./events/pingInternet";
import { REQUEST_DELETE_DATASET } from "./events/datasets/deleteDataset";
import {
  REQUEST_MERGE_DATASETS,
  MERGED_DATASETS
} from "./events/datasets/mergeDatasets";

/**
 * Actions the main process is listening and responding to. These are instantiated after
 * the browser windows goes up in the electron instance.
 *
 * See @looking-glass/electron#index.ts#createWindow.
 */
export const MAIN_LISTENERS = [
  GET_PING_STATUS.listen,
  REQUEST_DATASETS.listen,
  REQUEST_DELETE_DATASET.listen,
  REQUEST_MERGE_DATASETS.listen,
  REQUEST_SINGLE_DATASET.listen,
  START_PING.listen
];

/**
 * Actions the renderer (i.e. React) can request from the main process.
 * The main process will respond through a RENDERER_LISTENER.
 */
export const RENDERER_ACTIONS = {
  getPingStatus: GET_PING_STATUS.sendAction,
  requestDatasets: REQUEST_DATASETS.sendAction,
  requestDeleteDataset: REQUEST_DELETE_DATASET.sendAction,
  requestMergeDatasets: REQUEST_MERGE_DATASETS.sendAction,
  requestSingleDataset: REQUEST_SINGLE_DATASET.sendAction,
  startPing: START_PING.sendAction
};

/**
 * Actions the renderer is listening and responding to. These are instantiated
 * after the first complete render cycle of the react application.
 *
 * See @looking-glass/interface#LookingGlass.tsx#componentDidMount.
 */
export const RENDERER_LISTENERS = {
  getDatasets: GET_DATASETS,
  getSingleDataset: GET_SINGLE_DATASET,
  mergedDatasets: MERGED_DATASETS,
  pingStatus: PING_STATUS,
  pingPercentComplete: PING_PERCENT_COMPLETE
};

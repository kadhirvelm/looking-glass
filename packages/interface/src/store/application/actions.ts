import { TypedAction } from "redoodle";
import {
  IDatasets,
  ISingleDataset,
  IPingStatus,
  IPingPercentComplete
} from "@looking-glass/application-server";

export const SET_DATASETS = TypedAction.define("application/set-datasets")<
  IDatasets
>();

export const SET_SINGLE_DATASET = TypedAction.define(
  "application/set-single-dataset"
)<ISingleDataset>();

export const SET_PING_STATUS = TypedAction.define(
  "application/set-ping-status"
)<IPingStatus>();

export const SET_PING_PERCENT_COMPLETE = TypedAction.define(
  "application/set-ping-percent-complete"
)<IPingPercentComplete>();

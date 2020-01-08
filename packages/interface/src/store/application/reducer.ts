import { TypedReducer, setWith } from "redoodle";
import {
  IDatasets,
  ISingleDataset,
  IPingPercentComplete,
  IPingStatus
} from "@looking-glass/application-server";
import {
  SET_DATASETS,
  SET_SINGLE_DATASET,
  SET_PING_STATUS,
  SET_PING_PERCENT_COMPLETE
} from "./actions";

export interface IApplicationState {
  datasets?: IDatasets;
  singleDatasetInfo?: ISingleDataset;
  pingStatus?: IPingStatus;
  pingPercentComplete?: IPingPercentComplete;
}

export const EMPTY_APPLICATION_STATE: IApplicationState = {};

export const applicationReducer = TypedReducer.builder<IApplicationState>()
  .withHandler(SET_DATASETS.TYPE, (state, datasets) =>
    setWith(state, { datasets })
  )
  .withHandler(SET_SINGLE_DATASET.TYPE, (state, singleDatasetInfo) =>
    setWith(state, { singleDatasetInfo })
  )
  .withHandler(SET_PING_STATUS.TYPE, (state, pingStatus) =>
    setWith(state, { pingStatus })
  )
  .withHandler(SET_PING_PERCENT_COMPLETE.TYPE, (state, pingPercentComplete) =>
    setWith(state, { pingPercentComplete })
  )
  .build();

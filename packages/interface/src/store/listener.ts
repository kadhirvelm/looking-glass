import { Dispatch } from "redux";
import {
  RENDERER_LISTENERS,
  IDatasets,
  ISingleDataset,
  IPingStatus,
  IPingPercentComplete
} from "@looking-glass/application-server";
import {
  SET_DATASETS,
  SET_SINGLE_DATASET,
  SET_PING_STATUS,
  SET_PING_PERCENT_COMPLETE
} from "./application";

export function instantiateRendererListeners(dispatch: Dispatch) {
  RENDERER_LISTENERS.getDatasets.listen((_: any, datasets: IDatasets) => {
    dispatch(SET_DATASETS.create(datasets));
  });

  RENDERER_LISTENERS.getSingleDataset.listen(
    (_: any, singleDatasetInfo: ISingleDataset) => {
      dispatch(SET_SINGLE_DATASET.create(singleDatasetInfo));
    }
  );

  RENDERER_LISTENERS.pingStatus.listen((_: any, pingStatus: IPingStatus) => {
    dispatch(SET_PING_STATUS.create(pingStatus));
  });

  RENDERER_LISTENERS.pingPercentComplete.listen(
    (_: any, pingPercentComplete: IPingPercentComplete) => {
      dispatch(SET_PING_PERCENT_COMPLETE.create(pingPercentComplete));
    }
  );
}

export function removeListeners() {
  Object.values(RENDERER_LISTENERS).forEach(listener => {
    listener.removeListener();
  });
}

import { Dispatch } from "redux";
import {
  RENDERER_LISTENERS,
  IDatasets,
  ISingleDataset,
  IPingStatus,
  IPingPercentComplete,
  IMergedDatasets
} from "@looking-glass/application-server";
import { showToast } from "../utils/createToaster";
import {
  SET_DATASETS,
  SET_SINGLE_DATASET,
  SET_PING_STATUS,
  SET_PING_PERCENT_COMPLETE,
  SET_NEWLY_MERGED_DATASET
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

  RENDERER_LISTENERS.mergedDatasets.listen(
    (_: any, mergeResponse: IMergedDatasets) => {
      showToast({
        intent: "success",
        message: `Successfully created new dataset: ${mergeResponse.newMergedDatasetName}.`
      });
      dispatch(SET_NEWLY_MERGED_DATASET.create(mergeResponse));
    }
  );
}

export function removeListeners() {
  Object.values(RENDERER_LISTENERS).forEach(listener => {
    listener.removeListener();
  });
}

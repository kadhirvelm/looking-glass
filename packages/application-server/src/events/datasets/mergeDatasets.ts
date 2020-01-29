import { mergeDatasets, getDatasets } from "@looking-glass/application-scripts";
import { RendererListener } from "../../classes/rendererListener";
import { IMergedDatasets, IRequestMergeDatasets } from "../../typings";
import { BasicAction } from "../../classes/basicActions";

enum CHANNELS {
  REQUEST_MERGE_DATASETS = "request-merge-datasets",
  MERGED_DATASETS = "merged-datasets"
}

export const MERGED_DATASETS = new RendererListener<IMergedDatasets>(
  CHANNELS.MERGED_DATASETS
);

export const REQUEST_MERGE_DATASETS = new BasicAction<IRequestMergeDatasets>(
  CHANNELS.REQUEST_MERGE_DATASETS,
  async (event, requestMergeDatasets) => {
    const newMergedDatasetName = await mergeDatasets(
      requestMergeDatasets.datasetNames,
      requestMergeDatasets.outputDatasetName
    );
    const datasetNames = getDatasets();

    event.sender.send(
      MERGED_DATASETS.channel,
      MERGED_DATASETS.verifyArgs({
        datasetNames,
        newMergedDatasetName
      })
    );
  }
);

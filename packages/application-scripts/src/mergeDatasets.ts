import { JSONFileManager } from "./classes/JSONFileManager";
import { CONSTANTS } from "./utils/constants";

/**
 * Adds the given dataset to the new file by first bulk adding all of its data,
 * then adding its metadata to the dataset provenance, then add each of its data
 * points to the rowProvenance. After this completes, it will update the existing
 * dataset to show it's part of a merged dataset.
 *
 * @param datasetName The name of the dataset file
 * @param newFileManager The JSON file manager of the newly merged file
 */
function mergeSingleDataset(
  datasetName: string,
  newFileManager: JSONFileManager,
  newFileId: string
) {
  const currentFileManager = new JSONFileManager(
    datasetName,
    CONSTANTS.OUTPUT_DIRECTORY
  );
  const currentFile = currentFileManager.readFile();

  newFileManager.bulkAddToFile(currentFile.data);
  newFileManager.addProvenanceDatasets({
    [currentFile.metadata.id]: currentFile.metadata
  });

  const rowProvenance = Object.keys(currentFile.data)
    .map(key => ({
      [key]: currentFile.metadata.id
    }))
    .reduce((previous, next) => ({ ...previous, ...next }), {});
  newFileManager.addRowProvenance(rowProvenance);

  currentFileManager.addedToMergedDataset(newFileId);
}

export async function mergeDatasets(
  datasetNames: string[],
  outputDatasetName?: string
): Promise<string> {
  const newDatasetName =
    outputDatasetName || `Merged_${new Date().toUTCString()}.json`;

  const newFileManager = new JSONFileManager(
    newDatasetName,
    CONSTANTS.OUTPUT_DIRECTORY
  );
  await newFileManager.instantiateBasicFile();

  const newFileManagerId = newFileManager.getFileId();

  datasetNames.forEach(datasetName => {
    mergeSingleDataset(datasetName, newFileManager, newFileManagerId);
  });

  return newDatasetName;
}

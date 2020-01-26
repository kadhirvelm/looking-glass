import { JSONFileManager } from "./classes/JSONFileManager";
import { CONSTANTS } from "./utils/constants";

export function getDatasets() {
  return new JSONFileManager("", CONSTANTS.OUTPUT_DIRECTORY).readDirectory();
}

export function getSingleDataset(datasetName: string) {
  return new JSONFileManager(
    datasetName,
    CONSTANTS.OUTPUT_DIRECTORY
  ).readFile();
}

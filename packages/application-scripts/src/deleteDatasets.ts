import { unlinkSync } from "fs-extra";
import { join } from "path";
import { CONSTANTS } from "./utils/constants";

function deleteSingleDataset(path: string) {
  try {
    unlinkSync(path);
  } catch {
    // eslint-disable-next-line no-console
    console.warn(`No such dataset ${path} exists. Skipping.`);
  }
}

export function deleteDatasets(datasetNames: string[]) {
  datasetNames.forEach(datasetName => {
    deleteSingleDataset(join(CONSTANTS.OUTPUT_DIRECTORY, datasetName));
  });
}

import { SingleBar, Presets } from "cli-progress";
import { JSONFileManager } from "./JSONFileManager";
import { InternetManager } from "./internetManager";
import { CONSTANTS } from "./constants";

const progressBar = new SingleBar({}, Presets.shades_classic);
const TOTAL_PROGRESS_PER_DATAPOINT = 4;

const internetManager = new InternetManager(progressBar);

const fileManager = new JSONFileManager(
  `(${new Date().toUTCString()}).json`,
  CONSTANTS.OUTPUT_DIRECTORY
);

async function writeSingleDataPoint() {
  const response = await Promise.all([
    internetManager.pingInternet("127.0.0.1", 5),
    internetManager.pingInternet("www.google.com", 5),
    internetManager.pingSpeedtest()
  ]);
  await fileManager.addToFile({
    localPing: response[0],
    internetPing: response[1],
    speedTest: response[2]
  });
  progressBar.increment(1);
}

function writeDataset(
  counter: number,
  maxDataPoints: number,
  timeInSecondsBetweenCollections: number
) {
  return new Promise(async resolve => {
    await writeSingleDataPoint();

    if (maxDataPoints - counter === 0) {
      resolve();
      return;
    }

    setTimeout(async () => {
      await writeDataset(
        counter + 1,
        maxDataPoints,
        timeInSecondsBetweenCollections
      );
      resolve();
    }, timeInSecondsBetweenCollections);
  });
}

export async function pingNTimes(
  totalPings: number,
  timeInSecondsBetweenCollections: number
) {
  progressBar.start(totalPings * TOTAL_PROGRESS_PER_DATAPOINT + 1, 0);

  await fileManager.instantiateBasicFile();
  progressBar.increment(1);

  await writeDataset(0, totalPings, timeInSecondsBetweenCollections);
  progressBar.stop();
}

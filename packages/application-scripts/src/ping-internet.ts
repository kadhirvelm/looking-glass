import { JSONFileManager } from "./classes/JSONFileManager";
import { InternetManager } from "./classes/internetManager";
import { CONSTANTS } from "./utils/constants";

const TOTAL_PROGRESS_PER_DATAPOINT = 4;

async function writeSingleDataPoint(
  internetManager: InternetManager,
  fileManager: JSONFileManager,
  onLocalProgress: () => void
) {
  const response = await Promise.all([
    internetManager.pingInternet("127.0.0.1", 5),
    internetManager.pingInternet("www.google.com", 5),
    internetManager.pingSpeedtest()
  ]);

  fileManager.addToFile({
    localPing: response[0],
    internetPing: response[1],
    speedTest: response[2],
    timestamp: new Date()
  });

  onLocalProgress();
}

function writeDataset(
  counter: number,
  maxDataPoints: number,
  timeInSecondsBetweenCollections: number,
  internetManager: InternetManager,
  fileManager: JSONFileManager,
  onLocalProgress: () => void
) {
  return new Promise(async resolve => {
    if (maxDataPoints - counter === 0) {
      resolve();
      return;
    }

    await writeSingleDataPoint(internetManager, fileManager, onLocalProgress);

    setTimeout(async () => {
      await writeDataset(
        counter + 1,
        maxDataPoints,
        timeInSecondsBetweenCollections,
        internetManager,
        fileManager,
        onLocalProgress
      );
      resolve();
    }, timeInSecondsBetweenCollections * 1000);
  });
}

export async function pingNTimes(
  totalPings: number,
  timeInSecondsBetweenCollections: number,
  onProgress: (percent: number, totalDatapointsCollected: number) => void
) {
  const totalPoints = totalPings * TOTAL_PROGRESS_PER_DATAPOINT + 2;
  let currentPoints = 0;

  const onLocalProgress = () => {
    currentPoints += 1;
    onProgress(
      currentPoints / totalPoints,
      Math.floor((currentPoints - 1) / TOTAL_PROGRESS_PER_DATAPOINT)
    );
  };

  const fileManager = new JSONFileManager(
    `(${new Date().toUTCString()}).json`,
    CONSTANTS.OUTPUT_DIRECTORY
  );
  await fileManager.instantiateBasicFile();
  onLocalProgress();

  const internetManager = new InternetManager(onLocalProgress);
  await writeDataset(
    0,
    totalPings,
    timeInSecondsBetweenCollections,
    internetManager,
    fileManager,
    onLocalProgress
  );
  onLocalProgress();
}

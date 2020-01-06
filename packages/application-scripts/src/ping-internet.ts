import { JSONFileManager } from "./JSONFileManager";
import { InternetManager } from "./internetManager";
import { CONSTANTS } from "./constants";

const TOTAL_PROGRESS_PER_DATAPOINT = 4;

const fileManager = new JSONFileManager(
  `(${new Date().toUTCString()}).json`,
  CONSTANTS.OUTPUT_DIRECTORY
);

async function writeSingleDataPoint(
  internetManager: InternetManager,
  onLocalProgress: () => void
) {
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
  onLocalProgress();
}

function writeDataset(
  counter: number,
  maxDataPoints: number,
  timeInSecondsBetweenCollections: number,
  internetManager: InternetManager,
  onLocalProgress: () => void
) {
  return new Promise(async resolve => {
    if (maxDataPoints - counter === 0) {
      resolve();
      return;
    }

    await writeSingleDataPoint(internetManager, onLocalProgress);

    setTimeout(async () => {
      await writeDataset(
        counter + 1,
        maxDataPoints,
        timeInSecondsBetweenCollections,
        internetManager,
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

  const internetManager = new InternetManager(onLocalProgress);

  await fileManager.instantiateBasicFile();
  onLocalProgress();

  await writeDataset(
    0,
    totalPings,
    timeInSecondsBetweenCollections,
    internetManager,
    onLocalProgress
  );
  onLocalProgress();
}

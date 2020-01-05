import { JSONFileManager } from "./JSONFileManager";
import { InternetManager } from "./internetManager";

const fileManager = new JSONFileManager(
  `internetData(${new Date().toDateString()}).json`,
  "./dist/output"
);

async function writeSingleDataPoint() {
  const response = await Promise.all([
    InternetManager.pingInternet("127.0.0.1", 5),
    InternetManager.pingInternet("www.google.com", 5),
    InternetManager.pingSpeedtest()
  ]);
  fileManager.addToFile({
    localPing: response[0],
    internetPing: response[1],
    speedTest: response[2]
  });
}

async function writeDataset(counter: number, maxDataPoints: number) {
  await writeSingleDataPoint();

  if (maxDataPoints - counter !== 0) {
    /* eslint-disable @typescript-eslint/no-misused-promises */
    setTimeout(() => writeDataset(counter + 1, maxDataPoints), 5000);
    /* eslint-enable @typescript-eslint/no-misused-promises */
  }
}

export function main() {
  fileManager.writeEmptyFile();
  writeDataset(0, 10);
}

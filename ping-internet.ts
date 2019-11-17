import { JSONFileManager } from "./JSONFileManager";
import { InternetManager } from "./internetManager";

const internetManager = new InternetManager();
const fileManager = new JSONFileManager(`internetData(${new Date().toDateString()}).json`, "./dist/output");

async function writeSingleDataPoint() {
    const response = await Promise.all([internetManager.pingInternet("127.0.0.1", 5), internetManager.pingInternet("www.google.com", 5), internetManager.pingSpeedtest()]);
    fileManager.addToFile({ localPing: response[0], internetPing: response[1], speedTest: response[2] });
}

function writeDataset(counter: number, maxDataPoints: number) {
    setTimeout(async () => {
        await writeSingleDataPoint();
        
        if (maxDataPoints - counter === 0) {
            return;
        } else {
            writeDataset(++counter, maxDataPoints);
        }

    }, 5000);
}

async function main() {
    await fileManager.writeEmptyFile();
    writeDataset(0, 10);
}

main();

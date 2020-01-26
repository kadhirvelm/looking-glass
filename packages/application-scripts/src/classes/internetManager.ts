import { promisify } from "util";
import { exec } from "child_process";
import speedtest from "speedtest-net";

const execPromise = promisify(exec);

export class InternetManager {
  public constructor(private onProgress: () => void) {}

  public async pingInternet(address: string, count: number) {
    try {
      const response = await execPromise(`ping ${address} -c ${count}`, {
        encoding: "utf-8"
      });

      this.onProgress();

      const headline = response.stdout.match(/PING.*\n/g);

      const statistics = InternetManager.parseStatistics(
        response.stdout.match(/---.*\n.*\n.*/g)?.toString()
      );

      return {
        headline: headline?.[0],
        statistics
      };
    } catch (error) {
      return {
        error: "Something went wrong",
        stackTrace: error
      };
    }
  }

  public async pingSpeedtest() {
    try {
      const response = await InternetManager.executeSpeedTest();

      this.onProgress();

      return {
        response
      };
    } catch (error) {
      return {
        error: "Something went wrong",
        stackTrace: error
      };
    }
  }

  static executeSpeedTest() {
    return new Promise(resolve => {
      const datapoint = speedtest({ maxTime: 5000, pingCount: 3 });

      datapoint.on("data", (data: any) => resolve(data));
    });
  }

  static parseStatistics(statistics: string | undefined) {
    const splitByLine = statistics?.split("\n");
    if (splitByLine === undefined) {
      return {
        error: "No internet connection"
      };
    }

    return {
      overview: splitByLine[0],
      packets: splitByLine[1],
      stats: splitByLine[2]
    };
  }
}

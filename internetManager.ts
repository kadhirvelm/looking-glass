import { execSync } from "child_process";

export class InternetManager {    
    public async pingInternet(address: string, count: number) {
        try {
            const response = await execSync(`ping ${address} -c ${count}`, { encoding: "utf-8" });
    
            const headline = response.match(/PING.*\n/g);
            const statistics = this.parseStatistics(response.match(/---.*\n.*\n.*/g)?.toString());
    
            return {
                headline: headline?.[0],
                statistics,
            }
        } catch (error) {
            return {
                error: "Something went wrong",
                stackTrace: error,
            }
        }
    }
    
    public async pingSpeedtest() {
        try {
            const response = await execSync("speedtest-cli --simple", { encoding: "utf-8" });
    
            return {
                response,
            }
        } catch (error) {
            return {
                error: "Something went wrong",
                stackTrace: error,
            }
        }
    }

    private parseStatistics(statistics: string | undefined) {
        const splitByLine = statistics?.split("\n");
        if (splitByLine === undefined) {
            return {
                error: "No internet connection",
            }
        }
    
        return {
            overview: splitByLine[0],
            packets: splitByLine[1],
            stats: splitByLine[2],
        }
    }
}

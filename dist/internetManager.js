"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
class InternetManager {
    pingInternet(address, count) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield child_process_1.execSync(`ping ${address} -c ${count}`, { encoding: "utf-8" });
                const headline = response.match(/PING.*\n/g);
                const statistics = this.parseStatistics((_a = response.match(/---.*\n.*\n.*/g)) === null || _a === void 0 ? void 0 : _a.toString());
                return {
                    headline: (_b = headline) === null || _b === void 0 ? void 0 : _b[0],
                    statistics,
                };
            }
            catch (error) {
                return {
                    error: "Something went wrong",
                    stackTrace: error,
                };
            }
        });
    }
    pingSpeedtest() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield child_process_1.execSync("speedtest-cli --simple", { encoding: "utf-8" });
                return {
                    response,
                };
            }
            catch (error) {
                return {
                    error: "Something went wrong",
                    stackTrace: error,
                };
            }
        });
    }
    parseStatistics(statistics) {
        var _a;
        const splitByLine = (_a = statistics) === null || _a === void 0 ? void 0 : _a.split("\n");
        if (splitByLine === undefined) {
            return {
                error: "No internet connection",
            };
        }
        return {
            overview: splitByLine[0],
            packets: splitByLine[1],
            stats: splitByLine[2],
        };
    }
}
exports.InternetManager = InternetManager;

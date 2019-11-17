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
const JSONFileManager_1 = require("./JSONFileManager");
const internetManager_1 = require("./internetManager");
const internetManager = new internetManager_1.InternetManager();
const fileManager = new JSONFileManager_1.JSONFileManager(`internetData(${new Date().toDateString()}).json`, "./dist/output");
function writeSingleDataPoint() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield Promise.all([internetManager.pingInternet("127.0.0.1", 5), internetManager.pingInternet("www.google.com", 5), internetManager.pingSpeedtest()]);
        fileManager.addToFile({ localPing: response[0], internetPing: response[1], speedTest: response[2] });
    });
}
function writeDataset(counter, maxDataPoints) {
    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
        yield writeSingleDataPoint();
        if (maxDataPoints - counter === 0) {
            return;
        }
        else {
            writeDataset(++counter, maxDataPoints);
        }
    }), 5000);
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield fileManager.writeEmptyFile();
        writeDataset(0, 10);
    });
}
main();

import { ipcMain, ipcRenderer } from "electron";
import { ACTIONS } from "./definitions";

interface ISampleAction {}

export function listenSampleAction() {
  ipcMain.on(ACTIONS.SAMPLE_ACTION, (_, args: ISampleAction) => {
    // eslint-disable-next-line no-console
    console.log("Received sample actions with args:", args);
  });
}

export function sendSampleAction(args: ISampleAction) {
  ipcRenderer.send(ACTIONS.SAMPLE_ACTION, args);
}

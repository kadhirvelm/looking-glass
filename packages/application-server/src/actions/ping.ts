import { ipcMain, ipcRenderer, IpcRendererEvent } from "electron";
import { ACTIONS } from "./definitions";
import { IPingStatus, IPing } from "../typings";

const PING_STATUS: IPingStatus = {
  isPinging: false
};

export function listenPing() {
  ipcMain.on(ACTIONS.START_PING, event => {
    PING_STATUS.isPinging = true;
    event.sender.send(ACTIONS.PING_STATUS, PING_STATUS);
  });

  ipcMain.on(ACTIONS.STOP_PING, event => {
    PING_STATUS.isPinging = false;
    event.sender.send(ACTIONS.PING_STATUS, PING_STATUS);
  });
}

export function sendStartPing(args: IPing) {
  ipcRenderer.send(ACTIONS.START_PING, args);
}

export function sendStopPing(args: IPing) {
  ipcRenderer.send(ACTIONS.STOP_PING, args);
}

export function listenForPingStatus(
  callback: (event: IpcRendererEvent, status: IPingStatus) => void
) {
  ipcRenderer.on(ACTIONS.PING_STATUS, callback);
}

export function removeListenForPingStatus(
  callback: (event: IpcRendererEvent, status: IPingStatus) => void
) {
  ipcRenderer.removeListener(ACTIONS.PING_STATUS, callback);
}

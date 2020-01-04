import {
  listenForPingStatus,
  removeListenForPingStatus,
  sendSampleAction,
  sendStartPing,
  sendStopPing
} from "./actions";

export const IpcActions = {
  listenForPingStatus,
  removeListenForPingStatus,
  sendStartPing,
  sendStopPing,
  sendSampleAction
};

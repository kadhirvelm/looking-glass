import { BasicAction, RendererListener } from "./classes";
import { IPing, IPingStatus } from "./typings";

enum CHANNELS {
  START_PING = "start-ping",
  STOP_PING = "stop-ping",
  PING_STATUS = "ping-status"
}

/**
 * Actions
 */
const PING_STATUS = new RendererListener<IPingStatus>(CHANNELS.PING_STATUS);

const START_PING = new BasicAction<IPing>(CHANNELS.START_PING, event => {
  event.sender.send(
    PING_STATUS.channel,
    PING_STATUS.verifyArgs({ isPinging: true })
  );
});

const STOP_PING = new BasicAction<IPing>(CHANNELS.STOP_PING, event => {
  event.sender.send(
    PING_STATUS.channel,
    PING_STATUS.verifyArgs({ isPinging: false })
  );
});

/**
 * Boilerplate
 */
export const MAIN_ACTIONS = {};

export const MAIN_LISTENERS = [START_PING.listen, STOP_PING.listen];

export const RENDERER_ACTIONS = {
  startPing: START_PING.sendAction,
  stopPing: STOP_PING.sendAction
};

export const RENDERER_LISTENERS = {
  pingStatus: PING_STATUS
};

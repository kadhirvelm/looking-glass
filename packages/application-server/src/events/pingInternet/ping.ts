import { pingNTimes } from "@looking-glass/application-scripts";
import { RendererListener, BasicAction } from "../../classes";
import { IPingStatus, IPingPercentComplete, IPing } from "../../typings";

enum CHANNELS {
  GET_PING_STATUS = "get-ping-status",
  PING_STATUS = "ping-status",
  START_PING = "start-ping",

  PING_PERCENT_COMPLETE = "ping-percent-complete"
}

let CURRENT_PING_STATUS_IN_MEMORY: IPingStatus = { isPinging: false };

export const PING_STATUS = new RendererListener<IPingStatus>(
  CHANNELS.PING_STATUS
);

export const PING_PERCENT_COMPLETE = new RendererListener<IPingPercentComplete>(
  CHANNELS.PING_PERCENT_COMPLETE
);

export const START_PING = new BasicAction<IPing>(
  CHANNELS.START_PING,
  async (event, pingRequest) => {
    CURRENT_PING_STATUS_IN_MEMORY = { isPinging: true, pingRequest };
    event.sender.send(
      PING_STATUS.channel,
      PING_STATUS.verifyArgs(CURRENT_PING_STATUS_IN_MEMORY)
    );

    await pingNTimes(
      pingRequest.totalTimes,
      pingRequest.timeBetweenPings,
      (percent: number, totalDatapointsCollected: number) => {
        event.sender.send(
          PING_PERCENT_COMPLETE.channel,
          PING_PERCENT_COMPLETE.verifyArgs({
            percent,
            totalDatapointsCollected
          })
        );
      }
    );

    CURRENT_PING_STATUS_IN_MEMORY = { isPinging: false };
    event.sender.send(
      PING_STATUS.channel,
      PING_STATUS.verifyArgs(CURRENT_PING_STATUS_IN_MEMORY)
    );
  }
);

export const GET_PING_STATUS = new BasicAction<{}>(
  CHANNELS.GET_PING_STATUS,
  event => {
    event.sender.send(
      PING_STATUS.channel,
      PING_STATUS.verifyArgs(CURRENT_PING_STATUS_IN_MEMORY)
    );
  }
);

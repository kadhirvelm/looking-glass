import * as React from "react";
import { PingInternet } from "./pingInternet";
import { Datasets } from "./datasets";
import { Flexbox } from "../../common/flexbox";

export class CollectData extends React.PureComponent {
  public render() {
    return (
      <Flexbox flex="1" flexDirection="column">
        <Datasets />
        <PingInternet />
      </Flexbox>
    );
  }
}

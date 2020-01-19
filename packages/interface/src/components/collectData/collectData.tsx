import * as React from "react";
import { Flexbox } from "../../common/flexbox";
import { Datasets } from "./datasets";

export class CollectData extends React.PureComponent {
  public render() {
    return (
      <Flexbox flex="1" flexDirection="column">
        <Datasets />
      </Flexbox>
    );
  }
}

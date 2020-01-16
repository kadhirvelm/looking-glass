import * as React from "react";
import { IRouteOption, IUrlOptions } from "../utils/typings";
import "./homeBar.scss";

interface IProps {
  onChange: (newPage: IRouteOption) => void;
}

export class HomeBar extends React.PureComponent<IProps> {
  public render() {
    return (
      <div className="home-bar">
        <span onClick={this.handleOnClick(IUrlOptions.HOME)}>Home</span>
        <span onClick={this.handleOnClick(IUrlOptions.COLLECT_DATA)}>
          Collect
        </span>
        <span onClick={this.handleOnClick(IUrlOptions.ANALYZE_DATA)}>
          Analyze
        </span>
      </div>
    );
  }

  private handleOnClick = (url: IUrlOptions) => () => {
    const { onChange } = this.props;
    onChange({ url });
  };
}

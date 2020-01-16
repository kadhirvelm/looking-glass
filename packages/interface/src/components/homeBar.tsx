import * as React from "react";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { IRouteOption, IUrlOptions } from "../utils/typings";
import "./homeBar.scss";
import { IStoreState } from "../store/state";
import { SET_ROUTE } from "../store";
import classNames from "classnames";

interface IStoreProps {
  url: IUrlOptions;
}

interface IDispatchProps {
  setRoute: (newPage: IRouteOption) => void;
}

type IProps = IStoreProps & IDispatchProps;

const ROUTES: Array<{ routeUrl: IUrlOptions; name: string }> = [
  { routeUrl: IUrlOptions.HOME, name: "Home" },
  { routeUrl: IUrlOptions.COLLECT_DATA, name: "Collect" },
  { routeUrl: IUrlOptions.ANALYZE_DATA, name: "Analyze" }
];

export class UnconnectedHomeBar extends React.PureComponent<IProps> {
  public render() {
    return (
      <div className="home-bar">{ROUTES.map(this.renderSingleRouteOption)}</div>
    );
  }

  private renderSingleRouteOption = (value: {
    routeUrl: IUrlOptions;
    name: string;
  }) => {
    const { url } = this.props;
    const { routeUrl, name } = value;

    return (
      <span
        className={classNames("route-option", {
          selected: url === routeUrl
        })}
        onClick={this.handleOnClick(routeUrl)}
      >
        {name}
      </span>
    );
  };

  private handleOnClick = (url: IUrlOptions) => () => {
    const { setRoute } = this.props;
    setRoute({ url });
  };
}

function mapStateToProps(state: IStoreState): IStoreProps {
  return {
    url: state.interface.route.url
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return bindActionCreators(
    {
      setRoute: SET_ROUTE
    },
    dispatch
  );
}

export const HomeBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedHomeBar);

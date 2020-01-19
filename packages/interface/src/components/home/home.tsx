import * as React from "react";
import "./home.scss";

export class Home extends React.PureComponent {
  public render() {
    return (
      <div className="home-page">
        <div className="header">Welcome to Looking Glass.</div>
        <div className="description">
          Get started by selecting an option in the left hand bar.
        </div>
      </div>
    );
  }
}

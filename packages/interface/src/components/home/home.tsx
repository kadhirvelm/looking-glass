import * as React from "react";
import styles from "./home.module.scss";

export class Home extends React.PureComponent {
  public render() {
    return (
      <div className={styles.homePage}>
        <div className={styles.header}>Welcome to Looking Glass.</div>
        <div className={styles.description}>
          Get started by selecting an option in the left hand bar.
        </div>
      </div>
    );
  }
}

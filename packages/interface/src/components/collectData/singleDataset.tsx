import * as React from "react";
import { ISingleDataset } from "@looking-glass/application-server";
import { connect } from "react-redux";
import { NonIdealState } from "@blueprintjs/core";
import ReactJson from "react-json-view";
import { IFileMetadata } from "@looking-glass/application-scripts/dist/typings";
import { Flexbox } from "../../common/flexbox";
import { IStoreState } from "../../store/state";
import styles from "./singleDataset.module.scss";
import { METADATA } from "../../utils/getMetadata";

interface IStoreProps {
  singleDatasetInfo: ISingleDataset | undefined;
}

type IProps = IStoreProps;

class UnconnectedSingleDataset extends React.PureComponent<IProps> {
  public render() {
    const { singleDatasetInfo } = this.props;
    if (singleDatasetInfo === undefined) {
      return this.renderNonIdealState();
    }

    return (
      <Flexbox flexDirection="column">
        {this.renderMetadata(singleDatasetInfo)}
        <Flexbox className={styles.jsonContainer}>
          <ReactJson
            src={singleDatasetInfo.dataFile.data}
            style={{ backgroundColor: "#1F2833" }}
            theme="monokai"
          />
        </Flexbox>
      </Flexbox>
    );
  }

  private renderNonIdealState() {
    return (
      <NonIdealState
        description={
          <div className={styles.datasetNonIdeal}>
            Select a dataset to the left to explore.
          </div>
        }
        icon="search"
        title="No dataset selected."
      />
    );
  }

  private renderMetadata(singleDatasetInfo: ISingleDataset) {
    const { metadata } = singleDatasetInfo.dataFile;
    return (
      <Flexbox className={styles.metadataContainer} flexDirection="column">
        {METADATA.map(value =>
          this.renderSingleMetadataValue(
            value.title,
            value.toString(metadata[value.key] as any)
          )
        )}
      </Flexbox>
    );
  }

  private renderSingleMetadataValue(key: string, value: string) {
    return (
      <Flexbox>
        <Flexbox
          className={styles.metadataTitle}
          flex="1"
          justifyContent="flex-end"
        >
          {key}
        </Flexbox>
        <Flexbox className={styles.metadataValue} flex="3" flexWrap="wrap">
          {value}
        </Flexbox>
      </Flexbox>
    );
  }
}

function mapStateToProps(state: IStoreState): IStoreProps {
  return {
    singleDatasetInfo: state.application.singleDatasetInfo
  };
}

export const SingleDataset = connect(mapStateToProps)(UnconnectedSingleDataset);

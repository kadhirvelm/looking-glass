import * as React from "react";
import { ISingleDataset } from "@looking-glass/application-server";
import { connect } from "react-redux";
import { NonIdealState } from "@blueprintjs/core";
import ReactJson from "react-json-view";
import { Flexbox } from "../../common/flexbox";
import { IStoreState } from "../../store/state";
import styles from "./singleDataset.module.scss";
import { METADATA } from "../../utils/getMetadata";
import colors from "../../utils/colors.scss";

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
      <Flexbox className={styles.fadeIn} flex="1" flexDirection="column">
        {this.renderMetadata(singleDatasetInfo)}
        {this.renderReactJSON(singleDatasetInfo.dataFile.data)}
      </Flexbox>
    );
  }

  private renderNonIdealState() {
    return (
      <NonIdealState
        className={styles.fadeIn}
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
        <div className={styles.metadataContainerLabel}>Metadata</div>
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
        <Flexbox className={styles.metadataValue} flex="5" flexWrap="wrap">
          {value}
        </Flexbox>
      </Flexbox>
    );
  }

  private renderReactJSON(data: any) {
    return (
      <Flexbox className={styles.jsonContainer}>
        <div className={styles.jsonContainerLabel}>Raw data</div>
        <ReactJson
          src={data}
          style={{ backgroundColor: colors.darkGray }}
          theme="monokai"
        />
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

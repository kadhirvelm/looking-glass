import { ILookingGlassDataset } from "@looking-glass/application-scripts/dist/typings";

export interface IPing {
  totalTimes: number;
  timeBetweenPings: number;
}

export interface IPingStatus {
  isPinging: boolean;
  pingRequest?: IPing;
}

export interface IPingPercentComplete {
  percent: number;
  totalDatapointsCollected: number;
}

export interface IDatasets {
  datasetNames: string[];
}

export interface ISingleDatasetRequest {
  name: string;
}

export type ISingleDataset = {
  datasetName: string;
  dataFile: ILookingGlassDataset;
};

export type IDeleteDatasetsRequest = {
  datasetNames: string[];
};

export interface IMergedDatasets extends IDatasets {
  newMergedDatasetName: string;
}

export interface IRequestMergeDatasets {
  datasetNames: string[];
  outputDatasetName?: string;
}

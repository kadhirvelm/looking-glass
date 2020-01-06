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

export type ISingleDataset = any;

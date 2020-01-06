export interface IPing {}

export interface IPingStatus {
  isPinging: boolean;
}

export interface IDatasets {
  datasetNames: string[];
}

export interface ISingleDatasetRequest {
  name: string;
}

export type ISingleDataset = any;

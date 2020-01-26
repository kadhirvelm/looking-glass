export interface IDatasetProvenance {
  [id: string]: IFileMetadata;
}

export interface IFileMetadata {
  id: string;
  timestamp: Date;
  name: string;
  description: string;
  datasetProvenance?: IDatasetProvenance;
}

export interface IRowProvenanceMapping {
  [id: string]: string;
}

export interface ILookingGlassDataset {
  root: {
    data: any;
    metadata: IFileMetadata;
    rowProvenance: IRowProvenanceMapping;
  };
}

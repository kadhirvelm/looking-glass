export interface IDatasetProvenance {
  [id: string]: IFileMetadata;
}

export interface IFileMetadata {
  datasetProvenance?: IDatasetProvenance;
  description: string;
  id: string;
  partOfMergedDataset?: string[];
  name: string;
  timestamp: Date;
}

export interface IRowProvenanceMapping {
  [id: string]: string;
}

export interface ILookingGlassDataset {
  data: any;
  metadata: IFileMetadata;
  rowProvenance: IRowProvenanceMapping;
}

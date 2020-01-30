import { IFileMetadata } from "@looking-glass/application-scripts";

interface IMetadataRender<
  F extends keyof T,
  T = Omit<IFileMetadata, "datasetProvenance">
> {
  key: F;
  title: string;
  toString: (val: T[F]) => string;
}

const ID: IMetadataRender<"id"> = {
  key: "id",
  title: "ID",
  toString: val => val.toString()
};

const NAME: IMetadataRender<"name"> = {
  key: "name",
  title: "Name",
  toString: val => val.toString()
};

const DESCRIPTION: IMetadataRender<"description"> = {
  key: "description",
  title: "Description",
  toString: val => val.toString()
};

const TIMESTAMP: IMetadataRender<"timestamp"> = {
  key: "timestamp",
  title: "Timestamp",
  toString: val => new Date(val).toLocaleString()
};

const PART_OF_MERGED_DATASET: IMetadataRender<"partOfMergedDataset"> = {
  key: "partOfMergedDataset",
  title: "Part of datasets:",
  toString: val => val?.join(", ") || ""
};

export const METADATA = [
  ID,
  NAME,
  DESCRIPTION,
  TIMESTAMP,
  PART_OF_MERGED_DATASET
];

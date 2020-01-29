import fs from "fs-extra";
import uuid, { v4 } from "uuid";
import {
  IFileMetadata,
  IDatasetProvenance,
  IRowProvenanceMapping,
  ILookingGlassDataset
} from "../typings";

export class JSONFileManager {
  private fullAddress: string;

  constructor(name: string, private address: string) {
    this.fullAddress = `${this.address}/${name}`;
  }

  public instantiateBasicFile(metadata?: IFileMetadata) {
    const basicMetadata: IFileMetadata = {
      id: v4(),
      timestamp: new Date(),
      name: "No name",
      description: "No description",
      ...metadata
    };

    const basicFile: ILookingGlassDataset = {
      metadata: basicMetadata,
      data: {},
      rowProvenance: {}
    };

    return fs.outputFile(this.fullAddress, JSON.stringify(basicFile, null, 2));
  }

  public addToFile(contents: any) {
    const currentFile = this.readFile();

    currentFile.data[uuid()] = contents;

    return fs.writeFileSync(
      this.fullAddress,
      JSON.stringify(currentFile, null, 2)
    );
  }

  public bulkAddToFile(contents: any) {
    const currentFile = this.readFile();
    currentFile.data = { ...currentFile.data, ...contents };

    return fs.writeFileSync(
      this.fullAddress,
      JSON.stringify(currentFile, null, 2)
    );
  }

  public addProvenanceDatasets(datasetProvenance: IDatasetProvenance) {
    const currentFile = this.readFile();
    currentFile.metadata.datasetProvenance = {
      ...currentFile.metadata.datasetProvenance,
      ...datasetProvenance
    };

    return fs.writeFileSync(
      this.fullAddress,
      JSON.stringify(currentFile, null, 2)
    );
  }

  public addRowProvenance(rowProvenance: IRowProvenanceMapping) {
    const currentFile = this.readFile();
    currentFile.rowProvenance = {
      ...currentFile.rowProvenance,
      ...rowProvenance
    };

    return fs.writeFileSync(
      this.fullAddress,
      JSON.stringify(currentFile, null, 2)
    );
  }

  public addedToMergedDataset(mergedDatasetId: string) {
    const currentFile = this.readFile();
    currentFile.metadata.partOfMergedDataset = (
      currentFile.metadata.partOfMergedDataset || []
    ).concat(mergedDatasetId);

    return fs.writeFileSync(
      this.fullAddress,
      JSON.stringify(currentFile, null, 2)
    );
  }

  public readFile(): ILookingGlassDataset {
    const rawContent = fs.readFileSync(this.fullAddress);
    return JSON.parse(rawContent.toString());
  }

  public getFileId() {
    return this.readFile().metadata.id;
  }

  public readDirectory() {
    try {
      return fs.readdirSync(this.address);
    } catch {
      return [];
    }
  }
}

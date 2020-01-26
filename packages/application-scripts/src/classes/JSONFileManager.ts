import fs from "fs-extra";
import uuid, { v4 } from "uuid";
import { IFileMetadata } from "../typings";

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

    return fs.outputFile(
      this.fullAddress,
      JSON.stringify({ metadata: basicMetadata, data: {} }, null, 2)
    );
  }

  public async addToFile(contents: any) {
    const currentFile = await this.readFile();

    currentFile.data[uuid()] = contents;

    return fs.writeFileSync(
      this.fullAddress,
      JSON.stringify(currentFile, null, 2)
    );
  }

  public readFile() {
    const rawContent = fs.readFileSync(this.fullAddress);
    return JSON.parse(rawContent.toString());
  }

  public readDirectory() {
    try {
      return fs.readdirSync(this.address);
    } catch {
      return [];
    }
  }
}

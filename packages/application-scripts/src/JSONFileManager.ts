import fs from "fs-extra";
import { v4 } from "uuid";

interface IFileMetadata {
  id: string;
  timestamp: Date;
  name: string;
  description: string;
}

export class JSONFileManager {
  private fullAddress: string;

  constructor(name: string, address: string) {
    this.fullAddress = `${address}/${name}`;
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
      JSON.stringify({ metadata: basicMetadata }, null, 2)
    );
  }

  public async addToFile(contents: any) {
    const currentFile = await this.readFile();

    currentFile[new Date().toString()] = contents;

    return fs.writeFileSync(
      this.fullAddress,
      JSON.stringify(currentFile, null, 2)
    );
  }

  public readFile() {
    const rawContent = fs.readFileSync(this.fullAddress);
    return JSON.parse(rawContent.toString());
  }
}

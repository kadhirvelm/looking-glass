import fs from "fs";

export class JSONFileManager {
    private fullAddress: string;

    constructor(name: string, address: string) {
        this.fullAddress = `${address}/${name}`;
    }

    public async writeEmptyFile() {
        return fs.writeFileSync(this.fullAddress, JSON.stringify({}));
    }

    public async addToFile(contents: any) {
        const currentFile = await this.readFile();

        currentFile[new Date().toString()] = contents;

        return fs.writeFileSync(this.fullAddress, JSON.stringify(currentFile, null, 2));
    }

    public async readFile() {
        const rawContent = fs.readFileSync(this.fullAddress);
        return JSON.parse(rawContent.toString());
    }
}
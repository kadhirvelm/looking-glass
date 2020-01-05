import { ipcMain, ipcRenderer } from "electron";

export class BasicAction<T> {
  public constructor(
    public channel: string,
    private mainCallback: (event: Electron.IpcMainEvent, args: T) => void
  ) {}

  public listen = () => {
    ipcMain.on(this.channel, this.mainCallback);
  };

  public sendAction = (args: T) => {
    ipcRenderer.send(this.channel, args);
  };
}

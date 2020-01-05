import { IpcRendererEvent, ipcRenderer } from "electron";

export class RendererListener<T> {
  private rendererCallback:
    | ((event: IpcRendererEvent, args: T) => void)
    | undefined;

  public constructor(public channel: string) {
    this.rendererCallback = undefined;
  }

  public verifyArgs(args: T) {
    return args;
  }

  public listen = (
    rendererCallback: (event: IpcRendererEvent, args: T) => void
  ) => {
    this.rendererCallback = rendererCallback;

    ipcRenderer.on(this.channel, this.rendererCallback);
  };

  public removeListener = () => {
    if (this.rendererCallback === undefined) {
      return;
    }

    ipcRenderer.removeListener(this.channel, this.rendererCallback);
  };
}

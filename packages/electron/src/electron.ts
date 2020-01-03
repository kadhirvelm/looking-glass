import { app, BrowserWindow } from "electron";
import { instantiateListeners } from "@looking-glass/application-server";

function createWindow() {
  const basicWindow = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  });

  basicWindow.loadURL("http://localhost:3000/interface/index.html");

  instantiateListeners();
}

export function startApp() {
  app.on("ready", createWindow);
}

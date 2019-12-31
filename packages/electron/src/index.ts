import { app, BrowserWindow } from "electron";

function createWindow() {
    const basicWindow = new BrowserWindow({
        width: 800,
        height: 800,
        webPreferences: {
          nodeIntegration: true
        }
    });

    basicWindow.loadFile("index.html");

    basicWindow.webContents.openDevTools()
}

app.on("ready", createWindow);

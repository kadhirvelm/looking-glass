import { app, BrowserWindow } from "electron";

function createWindow() {
    const basicWindow = new BrowserWindow({
        width: 800,
        height: 800,
        webPreferences: {
          nodeIntegration: true
        }
    });

    basicWindow.loadURL("http://localhost:3000/interface/index.html");

    basicWindow.webContents.openDevTools()
}

app.on("ready", createWindow);

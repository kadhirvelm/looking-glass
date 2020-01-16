import { app, BrowserWindow } from "electron";
import { MAIN_LISTENERS } from "@looking-glass/application-server";
import { format } from "url";
import { join } from "path";

function instantiateListeners() {
  MAIN_LISTENERS.forEach(listener => {
    listener();
  });
}

function createWindow() {
  const basicWindow = new BrowserWindow({
    width: 800,
    height: 800,
    titleBarStyle: "hiddenInset",
    webPreferences: {
      nodeIntegration: true
    }
  });

  const reactProductionUrl = format({
    pathname: join(__dirname, "../interface/index.html"),
    protocol: "file:",
    slashes: true
  });

  const reactDevelopmentUrl = "http://localhost:3000/interface/index.html";

  basicWindow.loadURL(
    process.env.NODE_ENV === "production"
      ? reactProductionUrl
      : reactDevelopmentUrl
  );

  instantiateListeners();
}

app.on("ready", createWindow);

'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', function onClosed() {
    mainWindow = null;
  });
}

app.on('ready', createWindow);
app.on('window-all-closed', function onClosed() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function onActivate() {
  if (mainWindow === null) {
    createWindow();
  }
});

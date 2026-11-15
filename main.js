const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const url = require('url');
const { fork } = require('child_process');

let win;
let apiProcess; // To hold the API child process

const API_PATH = path.join(__dirname, 'api', 'index.js');
const API_PORT = 3000;

function createWindow() {
  win = new BrowserWindow({
    width: undefined,
    height: undefined,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.maximize();

  // Load the Angular app.
  // In production, the Angular app will be built to the 'dist' directory.
  // In development, you might want to load from 'localhost:4200'
  const appURL = url.format({
    pathname: path.join(__dirname, '/dist/ser-o-no-ser-ng/browser/index.html'),
    protocol: 'file:',
    slashes: true,
  });

  win.loadURL(appURL);

  // Open the DevTools.
  // win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', () => {
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    { label: 'Archivo', submenu: [{ role: 'quit', label: 'Salir' }] },
    { label: 'Editar', submenu: [
      { role: 'undo', label: 'Deshacer' }, { role: 'redo', label: 'Rehacer' },
      { type: 'separator' },
      { role: 'cut', label: 'Cortar' }, { role: 'copy', label: 'Copiar' },
      { role: 'paste', label: 'Pegar' }, { role: 'selectAll', label: 'Seleccionar todo' }
    ] },
    { label: 'Ver', submenu: [
      { role: 'reload', label: 'Recargar' },
      { role: 'toggleDevTools', label: 'Herramientas de desarrollo' },
      { type: 'separator' },
      { role: 'resetZoom', label: 'Tamaño real' },
      { role: 'zoomIn', label: 'Ampliar' }, { role: 'zoomOut', label: 'Reducir' },
      { role: 'togglefullscreen', label: 'Pantalla completa' }
    ] },
    { label: 'Ventana', submenu: [
      { role: 'minimize', label: 'Minimizar' }, { role: 'close', label: 'Cerrar' }
    ] }
  ]));
  const DATA_STORAGE_PATH = app.isPackaged
    ? path.dirname(app.getPath('exe'))
    : __dirname;

  apiProcess = fork(API_PATH, [], {
    env: { ...process.env, PORT: API_PORT, DATA_STORAGE_PATH },
  });

  apiProcess.on('error', (err) => {
    console.error('Failed to start API process:', err);
  });

  apiProcess.on('exit', (code, signal) => {
    console.log(`API process exited with code ${code} and signal ${signal}`);
  });

  // Give the API a moment to start before loading the window
  setTimeout(createWindow, 2000);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

app.on('will-quit', () => {
  if (apiProcess) {
    console.log('Killing API process...');
    apiProcess.kill();
  }
});

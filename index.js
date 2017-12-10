const path = require('path');
const electron = require('electron');

const MainWindow = require('./app/MainWindow');
const SoundboardTray = require('./app/SoundboardTray');
const AddWindow = require('./app/AddWindow');

const {app, BrowserWindow, Tray, ipcMain} = electron;

let mainWindow;
let addWindow;
let trayIcon;

app.on('ready', () => {
    // Make sure app doesn't show up in macOS dock
    if(process.platform === 'darwin') {
        app.dock.hide();
    }

    mainWindow = new MainWindow(`file://${__dirname}/src/soundboard.html`);

    const iconName = process.platform === "win32" ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname, `./assets/${iconName}`);
    trayIcon = new SoundboardTray(iconPath, mainWindow);
});

ipcMain.on('OPEN_ADD', (event) => {
    event.preventDefault();
    addWindow = new AddWindow(`file://${__dirname}/src/add.html`);
});

ipcMain.on('ADD_SOUNDBITE', (event, name, id, audio, icon) => {
    addWindow.close();
    mainWindow.webContents.send('ADD_SOUNDBITE2', name, id, audio, icon);
});

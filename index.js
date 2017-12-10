const path = require('path');
const electron = require('electron');

const MainWindow = require('./app/MainWindow');
const SoundboardTray = require('./app/SoundboardTray');

const {app, BrowserWindow, Tray, ipcMain} = electron;

let mainWindow;
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

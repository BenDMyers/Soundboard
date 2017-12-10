const electron = require('electron');
const {BrowserWindow} = electron;

class MainWindow extends BrowserWindow {
    constructor(url) {
        super({
            width: 300,
            height: 500,
            frame: false,
            resizable: false,
            show: false,
            skipTaskbar: true
        });
        this.loadURL(url);
    }
}

module.exports = MainWindow;

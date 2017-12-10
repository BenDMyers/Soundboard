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

        // Hide window when it loses focus
        this.on('blur', this.onBlur.bind(this));

        this.loadURL(url);
    }

    onBlur() { this.hide(); }
}

module.exports = MainWindow;

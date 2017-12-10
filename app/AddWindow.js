const electron = require('electron');
const {BrowserWindow} = electron;

class AddWindow extends BrowserWindow {
    constructor(url) {
        super({
            resizable: false
        });

        // Hide window when it loses focus
        // this.on('blur', this.onBlur.bind(this));

        this.loadURL(url);
    }

    // onBlur() { this.hide(); }
}

module.exports = AddWindow;

const electron = require('electron');
const {app, Tray, Menu} = electron;

class SoundboardTray extends Tray {
    constructor(iconPath, mainWindow) {
        super(iconPath);
        this.setToolTip('Soundboard');
        this.mainWindow = mainWindow;
        this.on('click', this.onClick.bind(this));
        this.on('right-click', this.onRightClick.bind(this));
    }

    onClick(event, bounds) {
        // Fun with bounds
        const {x,y} = bounds; // Click event bounds
        const {height, width} = this.mainWindow.getBounds(); // Window bounds

        if(this.mainWindow.isVisible()) {
            this.mainWindow.hide();
        }
        else {
            const yPos = process.platform === 'darwin' ? y : Math.floor(y - height);
            this.mainWindow.setBounds({
                x: Math.floor(x - (width/2)),
                y: yPos,
                height,
                width
            })
            this.mainWindow.show();
        }
    }

    onRightClick() {
        const menuConfig = Menu.buildFromTemplate([
            {
                label: 'Quit',
                click: () => app.quit()
            }
        ]);
        this.popUpContextMenu(menuConfig);
    }
}

module.exports = SoundboardTray;

const electron = require('electron');
const {ipcRenderer} = electron;

const fs = require('fs');

function submit(e) {}

function onClick(e) {
    e.preventDefault();
    var name = document.getElementById('name-in').value;
    var audioFiles = document.getElementById('audio-select').files;
    var iconFiles = document.getElementById('icon-select').files;
    if(name == '' || audioFiles.length == 0 || iconFiles.length == 0) {
        if(name == '') {
            document.getElementById('name-in').focus();
        }
        if(audioFiles.length == 0) {
            document.getElementById('audio-path').innerHTML = '<span style="color: #CC0000">This field is required</span>';
        }
        if(iconFiles.length == 0) {
            document.getElementById('icon-path').innerHTML = '<span style="color: #CC0000">This field is required</span>';
        }
        return;
    }
    var id = Math.floor(Math.random() * 10000000);
    var audioPath = `${id}-${audioFiles[0].name}`;
    var iconPath = `${id}-${iconFiles[0].name}`;
    fs.createReadStream(audioFiles[0].path).pipe(fs.createWriteStream(`${__dirname}/../assets/sounds/${audioPath}`)).on('close', () => {
        fs.createReadStream(iconFiles[0].path).pipe(fs.createWriteStream(`${__dirname}/../assets/icons/${iconPath}`)).on('close', () => {
            ipcRenderer.send('ADD_SOUNDBITE', name, id, audioPath, iconPath);
        });
    });
}

function updateAudioLabel() {
    document.getElementById('audio-path').innerHTML = document.getElementById('audio-select').files[0].name;
}

function updateIconLabel() {
    document.getElementById('icon-path').innerHTML = document.getElementById('icon-select').files[0].name;
}

window.onload = function () {
    document.getElementById('audio-select').addEventListener('change', updateAudioLabel);
    document.getElementById('icon-select').addEventListener('change', updateIconLabel);
}

window.onunload = function () {
    ipcRenderer.send('CLOSE_ADD');
}

const fs = require('fs');
const electron = require('electron');
const {ipcRenderer} = electron;

var soundbites = [];
var audio;

function createButton(id, name, img) {
    var button = document.createElement('button');
    button.classList = 'btn btn-secondary dolce col-xs sq';
    button.innerHTML = `<center><img id="btn-${id}" src="../assets/icons/${img}" width="75px" height="75px" style="display: block; margin-bottom: 10px; margin-top: 20px;"/><span style="display: block; width: 100px;"><p class="truncate">${name}</p></span></center>`;
    return button;
}

function populateButtons(list) {
    var container = document.getElementById('soundbites');
    container.innerHTML = '';
    var currentRow;
    for (var i = 0; i < list.length; i++) {
        if(i % 2 == 0) {
            currentRow = document.createElement('div');
            currentRow.classList = 'row';
            container.appendChild(currentRow);
        }
        var button = createButton(i, list[i].name, list[i].img);
        button.setAttribute('onclick', `play("${list[i].sound}")`);
        currentRow.appendChild(button);
    }
}

function play(path) {
    if(audio != null) {audio.pause();}
    audio = new Audio(`../assets/sounds/${path}`);
    audio.play();
}

function filter() {
    var search = document.getElementById('filter');
    console.log(search.value);
    if(search.value == '') {
        populateButtons(soundbites);
        return;
    }
    var filtered = [];
    for (var i = 0; i < soundbites.length; i++) {
        if(soundbites[i].name.toLowerCase().includes(search.value.toLowerCase())) {
            filtered.push(soundbites[i]);
        }
    }
    populateButtons(filtered);
}

function read() {
    var data = fs.readFileSync('./src/soundbites.json');
    soundbites = JSON.parse(data.toString());
    console.log(soundbites);
}

function openAdd() {
    ipcRenderer.send('OPEN_ADD');
}

ipcRenderer.on('ADD_SOUNDBITE2', (event, name, id, audio, icon) => {
    const newSoundbite = {id: id, name: name, img: icon, sound: audio};
    soundbites.push(newSoundbite);
    soundbites.sort((a, b) => {
        return a.name.localeCompare(b.name)
    });
    var json = JSON.stringify(soundbites);
    fs.writeFile(`${__dirname}/soundbites.json`, json, 'utf8', () => {});
    populateButtons(soundbites);
});

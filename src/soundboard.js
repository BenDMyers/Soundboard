const fs = require('fs');

soundbites = [];

function createButton(id, name, img) {
    var button = document.createElement('button');
    button.classList = 'btn btn-secondary dolce col-xs sq';
    button.innerHTML = `<center><img id="btn-${id}" src="../assets/icons/${img}" width="50%" style="display: block; padding-bottom: 10px;"/></center>` + name;
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

function play(path) {new Audio(`../assets/sounds/${path}`).play();}

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

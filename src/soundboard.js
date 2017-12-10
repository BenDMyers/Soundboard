function createButton(id, name, img) {
    var button = document.createElement('button');
    button.classList = 'btn btn-secondary dolce col-xs sq';
    button.innerHTML = `<center><img id="btn-${id}" src="../assets/${img}" width="50%" style="display: block; padding-bottom: 10px;"/></center>` + name;
    return button;
}

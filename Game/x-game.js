function createBoard() {
  var appContainer = document.querySelector('#app');

  var boardData = [
    '_________________###########',
    '_________________#_________#',
    '_p_______________#_________#',
    '_________________###########',
    '____________________________',
    '________#######_____________',
    '________#_____#_____________',
    '________#_____#_____________',
    '________###_###_____________',
    '____________________________',
    '____________________________',
    '#######_______########______',
    '______#______________#______',
    '______#_______#______#______',
    '______#_______#______#______',
    '______________########______',
    '______#_____________________',
    '______#_____________________',


  ]

  var grid = document.createElement('div');
  grid.classList.add('grid');

  appContainer.appendChild(grid);

  for (var j = 0; j < boardData.length; j += 1) {
    var row = document.createElement('div');
    row.classList.add('gridRow');

    grid.appendChild(row);

    var rowData = boardData[j];
    var size = rowData.length;

    for (var i = 0; i < size; i += 1) {
      var cell = document.createElement('div');
      cell.classList.add('gridCell');
      cell.setAttribute('data-x', i)
      cell.setAttribute('data-y', j)
      if (rowData[i] === 'p') {
        cell.classList.add('player');
      }
      if (rowData[i] === '#') {
        cell.classList.add('wall');
      }
      row.appendChild(cell);
    }
  }
}

createBoard();
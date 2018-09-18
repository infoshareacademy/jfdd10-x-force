var appContainer = document.querySelector('#app');

var boardData = [
  '######################',
  '#_________##_________#',
  '#__#__#___##_________#',
  '#__####___##_________#',
  '#______c__##_________#',
  '############_________#',
   '#__#__#___##_________#',
  '#__####___##_________#',
  '#______c__##_________#',
  '############_________#'
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
    if (rowData[i] === '#') {
      cell.classList.add('wall');
    }
    if (rowData[i] === 'c') {
      cell.classList.add('pacman');
    }
    if (rowData[i] === 'f') {
      cell.classList.add('fruit');
    }
    row.appendChild(cell);
  }
}
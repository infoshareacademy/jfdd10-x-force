var appContainer = document.querySelector('#app');

var boardData = [
  '____________________________',
  '____________________________',
  '____________________________',
  '____________________________',
  '____________________________',
  '____________________________',
  '____________________________',
  '____________________________',
  '____________________________',
  '____________________________',
  '____________________________',
  '____________________________',
  '____________________________',
  '____________________________',
  '____________________________',
  '____________________________',
  '____________________________',
  '____________________________',
 
 
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
    
    row.appendChild(cell);
  }
}
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

var direction = ''

window.addEventListener('keydown', function (event) {
  var key = event.code

  if (key === 'ArrowUp') {
    direction = 'up';
  }
  if (key === 'ArrowDown') {
    direction = 'down';
  }
  if (key === 'ArrowRight') {
    direction = 'right';
  }
  if (key === 'ArrowLeft') {
    direction = 'left';
  }

})
window.addEventListener('keyup', function (event) {
  var key = event.code

  if (key === 'ArrowUp') {
    direction = '';
  }
  if (key === 'ArrowDown') {
    direction = '';
  }
  if (key === 'ArrowRight') {
    direction = '';
  }
  if (key === 'ArrowLeft') {
    direction = '';
  }

})

var directions = {
  left: function (player) {
    return player.previousElementSibling;
  },
  right: function (player) {
    return player.nextElementSibling;
  },
  up: function (player) {
    var colIndex = Array.from(player.parentElement.children).indexOf(player);
    return player.parentElement.previousElementSibling.children[colIndex];
  },
  down: function (player) {
    var colIndex = Array.from(player.parentElement.children).indexOf(player);
    return player.parentElement.nextElementSibling.children[colIndex];
  }

}
var player = document.querySelector('.player');
var badges = [];
var beginAt = Date.now()
var lastMoveTime = beginAt;
var lastBadgeTime = beginAt;
var badgeDTime = 500;
update();

function update() {
  var now = Date.now();
  if (now - lastMoveTime > 100) {
    movePlayer();
    lastMoveTime = now;
  }
  if (now - lastBadgeTime > badgeDTime) {
    if (badges.length < 5) {
      badges.push(generateBadge());
      lastBadgeTime = now;
    }
    
  }
  
  
  requestAnimationFrame(update);
}

function movePlayer() {
  
  var target = (directions[direction] || function () {
    return null
  })(player)

  if (target != null &&
    !target.classList.contains('wall')
  ) {
    player.classList.remove('player');
    target.classList.add('player');
    player = target;
  }

  if (target != null &&
    target.classList.contains('badge')
  ) {
    target.classList.remove('badge');
    scorePoint();
    badges = badges.filter(function (badge) { return badge !== target });
    
  }
}

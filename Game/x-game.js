var appContainer = document.querySelector('#app');

var boardData = [
  '_________________#_________#',
  '_________________#_________#',
  '_p____##_###_____#_________#',
  '______#____#_____#_________#',
  '______#____#_____#####_#####',
  '___####____#_______________e',
  '___#_______________________e',
  '___#_______#_______#########',
  '___#########_______#________',
  '____________________________',
  '___________________#________',
  '#######__####_####_#________',
  '______#__#_______#_#________',
  '______#__#_______#_#________',
  '______#__#_______#_#________',
  '_________#_______#_#________',
  '______#__#_______#_#________',
  '______#__#_______#_#________',


]

var boardData1 = [
  '______#__________#_________#',
  '______#__________#_________#',
  '______#__________#_________#',
  '______#__________#_________#',
  '#######__________###########',
  'ep__________________________',
  'e___________________________',
  '#######____________#########',
  '______#____________#________',
  '____________________________',
  '______#____________#________',
  '______#____________#________',
  '______#____________#________',
  '______#____________#________',
  '______#____________#________',
  '___________________#________',
  '______#____________#________',
  '______#____________#________',


]
function generateBoard(map) {
  var grid = document.createElement('div');
  grid.classList.add('grid');

  appContainer.innerHTML = ''
  appContainer.appendChild(grid);
  

  for (var j = 0; j < map.length; j += 1) {
    var row = document.createElement('div');
    row.classList.add('gridRow');

    grid.appendChild(row);

    var rowData = map[j];
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
      if (rowData[i] === 'e') {
        cell.classList.add('exit');
      }
      row.appendChild(cell);
    }
    
  }
player = document.querySelector('.player');
}
function generateBadge(){
    for(var i=0; i<5; i++){
  var freeCells = document.querySelectorAll('.gridCell:not(.wall):not(.player):not(.badge)')
  howManyFreeCells = freeCells.length
  
  var randomNumber = Math.random();
  var randomIndex = Math.floor(randomNumber * howManyFreeCells);
  var randomCell = freeCells[randomIndex];
  
  
  randomCell.classList.add('badge');
  
  return randomCell;
    }
}
generateBoard(boardData)

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

    // if(player.parentElement.previousElementSibling !== null){
    //   return player.parentElement.previousElementSibling.children[colIndex];
    // } 
    // return null
    return player.parentElement.previousElementSibling && player.parentElement.previousElementSibling.children[colIndex]

  },
  down: function (player) {
    var colIndex = Array.from(player.parentElement.children).indexOf(player);
    // return player.parentElement.nextElementSibling.children[colIndex];
    return player.parentElement.nextElementSibling && player.parentElement.nextElementSibling.children[colIndex]
  }

}
//
// var badges = [];
// var beginAt = Date.now()
// var lastMoveTime = beginAt;
// var lastBadgeTime = beginAt;
// var badgeDTime = 500;
// update();

// function update() {
//   var now = Date.now();
//   if (now - lastMoveTime > 100) {
//     movePlayer();
//     lastMoveTime = now;
//   }
//   if (now - lastBadgeTime > badgeDTime) {
//     if (badges.length < 5) {
//       badges.push(generateBadge());
//       lastBadgeTime = now;
//     }

//   }


//   requestAnimationFrame(update);
// }

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
    

  }
  if (target != null &&
    target.classList.contains('exit')
  ) {
    generateBoard(boardData1)
   
  }
}


setInterval(function(){

 
 
 
  movePlayer()
  






},100)
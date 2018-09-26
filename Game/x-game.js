function play() {
  var gridNode = document.querySelector('.grid');
  if (gridNode) {
    gridNode.remove();


  }
  

  var appContainer = document.querySelector('#app');

  var boardData0 = [
    '_________________#_________#',
    '_________________#_________#',
    '_p____##_###_____#_________#',
    '______#____#_____#_________#',
    '______#____#_____#####_#####',
    '___####____#_______________1',
    '___#____e__________#########',
    '___#_______#_______#________',
    '___#########_______#________',
    '____________________________',
    '_____________e_____#________',
    '#######__####_####_#________',
    '______#__#_______#_#________',
    '______#__#_______#_#________',
    '______#__#_______#_#________',
    '___e_____#_______#_#________',
    '______#__#_______#_#________',
    '______#__#_______#_#________',


  ]

  var boardData1 = [
    '_____#______________________',
    '_____#______________________',
    '######______________________',
    '_______######____#####______',
    '_______#____#____#___#______',
    'p______#____#____#___#______',
    '_______##_###____##_##______',
    '____________________________',
    '_________######___######____',
    '_________#_____________#____',
    '_________#___##_####___#____',
    '_________#___#_____#___#____',
    '_________#___#_____#___#____',
    '####_____#___#######___#____',
    '___#_____#_____________#____',
    '___#_____###############____',
    '____________________________',
    '2__#________________________',


  ]
  var boardData2 = [
    'p__#_____________#_________#',
    '_#_#__#######____#_________#',
    '_#_#__#___#_#____#_________#',
    '_#_#______#_#____#_________#',
    '_#_#___#__#_###__#####_#####',
    '_#_#___#______#____________2',
    '##_#___#__##__#____________2',
    '___#___#__##__#____#########',
    '___#####__##__#____#________',
    '______________#_____________',
    '______#______e#____########_',
    '#######__####_####_#________',
    '_________#_______#_#_#######',
    '_#########_______#_#________',
    '_#____________####_########_',
    '_#____#__#____#__#_#________',
    '_######__#____#__#_#________',
    '_________#_______#_#________',


  ]
function createBoard(map){
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
        cell.classList.add('enemy')
      }
      if (rowData[i] === '1') {
        cell.classList.add('Map1')
      }
      if (rowData[i] === '2') {
        cell.classList.add('Map2')
      }
      row.appendChild(cell);
      
    }
  }
  for(var i = 0; i<5; i++){
  generateBadge()
  }
}
createBoard(boardData0)
  

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
      return player.parentElement.previousElementSibling && player.parentElement.previousElementSibling.children[colIndex]
    },
    down: function (player) {
      var colIndex = Array.from(player.parentElement.children).indexOf(player);
      return player.parentElement.nextElementSibling && player.parentElement.nextElementSibling.children[colIndex]
    }

  }


  var player 
  var enemies = document.querySelectorAll('.enemy');
  var badges = [];
  var beginAt = Date.now()
  var lastMoveTime = beginAt;
  var lastBadgeTime = beginAt;
  var lastEnemyTime = beginAt;
  var badgeDTime = 500;
  update();

  function destroyBadge(badge) {
    badge.domNode.classList.remove('badge')
  }

  function update() {
    var now = Date.now();
    if (now - lastMoveTime > 100) {
      movePlayer();
      lastMoveTime = now;
    }

 

    
    if (score === winScore) {
      badges.forEach(destroyBadge)
      badges = []
      return
    }

    if (now - lastEnemyTime > 100) {
      document.querySelectorAll('.enemy').forEach(function (enemy) {
        moveCharacter(enemy, 'enemy', true)
        lastEnemyTime = now;

      })
    }

    requestAnimationFrame(update);
  }

  function movePlayer() {
    player = document.querySelector('.player');
    player = moveCharacter(player, 'player')
  }


  function moveCharacter(player, className, shouldBeRandom) {
    var target;

    if (shouldBeRandom) {
      var randomDirections = {
        1: 'down',
        2: 'up',
        3: 'left',
        4: 'right'
      }

      const randomKeyDirection = Math.ceil(Math.random() * 4);
      target = directions[randomDirections[randomKeyDirection]](player);
    } else {
      target = (directions[direction] || function () {
        return null
      })(player)
    }

    if (target != null &&
      !target.classList.contains('wall') && !target.classList.contains('enemy')) {
      player.classList.remove(className);
      target.classList.add(className);
      player = target;
    }


    if (player.classList.contains('player')) {

      if (target != null &&
        target.classList.contains('badge')
      ) {
        target.classList.remove('badge');
        scorePoint();
        badges = badges.filter(function (badge) { return badge !== target });

      }
      if (target != null &&
        target.classList.contains('Map1')
      ) {
        createBoard(boardData1)
      }
      if (target != null &&
        target.classList.contains('Map2')
      ) {
        createBoard(boardData2)
      }
      

    }
    return player;
  }

}


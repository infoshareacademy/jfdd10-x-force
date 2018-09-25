function play() {
  var gridNode = document.querySelector('.grid');
  if (gridNode) {
    gridNode.remove();

  }

  var appContainer = document.querySelector('#app');

  var boardData = [
    '_________________#_________#',
    '_________________#_________#',
    '_p____##_###_____#_________#',
    '______#____#_____#_________#',
    '______#____#_____#####_#####',
    '___####____#________________',
    '___#____e___________________',
    '___#_______#_______#########',
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
      if (rowData[i] === 'e') {
        cell.classList.add('enemy')
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
      return player.parentElement.previousElementSibling && player.parentElement.previousElementSibling.children[colIndex]
    },
    down: function (player) {
      var colIndex = Array.from(player.parentElement.children).indexOf(player);
      return player.parentElement.nextElementSibling && player.parentElement.nextElementSibling.children[colIndex]
    }

  }


  var player = document.querySelector('.player');
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

 

    if (now - lastBadgeTime > badgeDTime) {
      if (badges.length < 5) {
        badges.push({
          domNode: generateBadge(),
          generatedAt: now,
          lifetime: 3000 + (Math.random() * 5000)
        });
        lastBadgeTime = now;
      }
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

    }
    return player;
  }

}


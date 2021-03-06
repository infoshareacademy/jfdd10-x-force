function play() {
  var gridNode = document.querySelector('.grid');
  var life = 3;
  if (gridNode) {
    gridNode.remove();

  }
  playerName = prompt("Please enter your name:", "player");

  var appContainer = document.querySelector('#app');

  var boardData = [
    '________________e#_________#',
    '_________________#___e_____#',
    '_p____##_###_____#_________#',
    '______#____#_____#_________#',
    '______#____#_____#####_#####',
    '___####____#______e_________',
    '___#____e___________________',
    '___#_______#_______#########',
    '___#########_______#________',
    '__e____________________e____',
    '_____________e_____#________',
    '#######__####_####_#________',
    '______#__#_______#_#________',
    '______#__#_______#_#________',
    '______#__#___e___#_#___e____',
    '___e_____#_______#_#________',
    '______#__#_______#_#________',
    '______#__#_______#_#________',


  ]

  var grid = document.createElement('div');
  grid.classList.add('grid');

  appContainer.innerHTML = ''

  appContainer.appendChild(grid);

  var playerPosition = {
    x: 0,
    y: 0
  }

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

  var tracer = document.createElement('div');
  tracer.classList.add('tracer');
  // tracer.style.position = 'absolute';
  // tracer.style.width = '40px';
  // tracer.style.height = '40px';    
  // tracer.style.background = 'blue';
  // tracer.style.transition = 'all 0.2s';


  grid.appendChild(tracer);





  document.querySelector('.healthbar').classList.add('health')



  var direction = ''
  var bulletDirection = 'right'
  var bullet = null

  window.addEventListener('keydown', function (event) {
    var key = event.code

    if (key === 'ArrowUp') {
      direction = 'up';
      tracer.style.transform = 'rotate(-90deg)'
    }
    if (key === 'ArrowDown') {
      direction = 'down';
      tracer.style.transform = 'rotate(90deg)'
    }
    if (key === 'ArrowRight') {
      direction = 'right';
      tracer.style.transform = 'rotate(0deg)'
    }
    if (key === 'ArrowLeft') {
      direction = 'left';
      tracer.style.transform = 'rotate(180deg)'
    }
    if (key === 'Space') {
      if (bullet === null) {
        bullet = directions[bulletDirection](player)
        if (bullet &&
          bullet.classList.contains('gridCell') &&
          !bullet.classList.contains('wall')
        ) {

          bullet.classList.add('bullet')
          var bulletIntervalId = setInterval(function () {
            bullet.classList.remove('bullet');
            if (bullet.classList.contains('enemy')){
              bullet.classList.remove('enemy')
            }
            bullet = directions[bulletDirection](bullet)
            if (
              bullet &&
              bullet.classList.contains('gridCell') &&
              !bullet.classList.contains('wall')
            ) {
              bullet.classList.add('bullet')
            } else {
          
              bullet = null;
              clearInterval(bulletIntervalId)
            }

          }, 16)
        } else {
          bullet = null
        }

      }
    }
    bulletDirection = (bullet === null && direction) || bulletDirection

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

  var heart = document.querySelectorAll('.heart');
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

    badges.filter(function (badge) {
      return badge.generatedAt + badge.lifetime < now
    }).forEach(destroyBadge)

    badges = badges.filter(function (badge) {
      return badge.generatedAt + badge.lifetime >= now
    })

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
      saveGameState(score, playerName);
      // stopGame(true);
      return
    }

    if (now - lastEnemyTime > 200) {
      document.querySelectorAll('.enemy').forEach(function (enemy) {
        moveCharacter(enemy, 'enemy', true)
        lastEnemyTime = now;

      })
    }

    if (life === 0) {
      alert('YOU LOSE');
      window.location.href = '/Game/x-game.html';
    }

    requestAnimationFrame(update);
  }

  function movePlayer() {
    player = moveCharacter(player, 'player');
    var y = +player.getAttribute('data-y');
    var x = +player.getAttribute('data-x');
    tracer.style.top = y * 40 + 'px';
    tracer.style.left = x * 40 + 'px';
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
      target = (directions[randomDirections[randomKeyDirection]] || function () {
        return null
      })(player);
    } else {
      target = (directions[direction] || function () {
        return null
      })(player)
    }
    if (className === 'player') {
    }
    if (
      target &&
      target.classList.contains('gridCell') &&
      !target.classList.contains('wall') && !target.classList.contains('enemy')) {
      player.classList.remove(className);
      target.classList.add(className);
      player = target;
    } else {
      return player;
    }


    if (player.classList.contains('player')) {

      if (target != null &&
        target.classList.contains('badge')
      ) {
        target.classList.remove('badge');
        scorePoint();
        badges = badges.filter(function (badge) { return badge !== target });
      }


      if (className === 'player') {
        if (target !== null &&
          target.classList.contains('enemy')
        ) {
          var heart = document.querySelectorAll('.heart:last-child').forEach(function (element) {
            element.remove()
          });
        }
      } else {
        if (target !== null &&
          target.classList.contains('player')
        ) {
          var heart = document.querySelectorAll('.heart:last-child').forEach(function (element) {
            life = life - 1;
            element.remove()
          });
        }
      }
    }
    return player;
  }

}


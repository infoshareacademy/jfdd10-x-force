


function play() {
  var gridNode = document.querySelector('.grid');
  if (gridNode) {
    gridNode.remove();

  }

  generateBoard();

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


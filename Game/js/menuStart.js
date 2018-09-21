

function menuStart() {
  window.addEventListener('click', function () {
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
  })
}
menuStart();

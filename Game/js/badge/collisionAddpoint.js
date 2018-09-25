


function collisionAddpoint(range, player, target) {
    player = document.querySelector('.player');
    target = document.querySelector('.badge');


    setInterval(function () {

       
        if ( (target != null && target.classList.contains('badge'))
        ) {
            target.remove.classList('badge')
            scorePoint();
        }

    }, 100)
}
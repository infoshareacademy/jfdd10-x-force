


function collisionAddpoint(range, player, target) {
    player = document.querySelector('.player');
    target = document.querySelector('.badge');


    setInterval(function () {

        range.map(function(arr){
            return arr.find(player, target){
                return player === target ? true : false;
            }

        })

        if ( (target != null && target.classList.contains('badge') && player)
        ) {
            target.remove.classList('badge')
            scorePoint();
        }

    }, 100)
}
var score = 0;
var givePoint = 1;
var winScore = 10;
var winText = 'You win!!!';
var dateTime = new Date();

function scorePoint(){
    document.querySelector('.score').innerHTML = 'Point: ' + (score += givePoint);
    
    if (score === winScore) {
        var winPoint = document.querySelector('.winText').innerHTML = winText;
        alert('You won congratulation');
        window.location.href=('../Game/x-game.html');
    }
}

var score = 0;

function scorePoint(){
    document.querySelector('.score').innerHTML = 'Point: ' + (score += 5);

}

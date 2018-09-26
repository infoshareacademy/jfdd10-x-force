

function scoreMenu(){
    var scoreTabel = document.querySelector('.scoreTabel');
    var tr = document.createElement('tr');
    var td = document.createElement('td');

    if (stopGame(true)) {
        var state = loadGameState();

        scoreTabel.appendChild(tr);
        tr.appendChild(td);
        td.innerText(state.score);
    }


}

function loadGameState() {
    return JSON.parse(localStorage.getItem('gameState'));
}

function saveGameState() {
    var state = { score: score };
    console.log('save score', state);
    localStorage.setItem('gameState', JSON.stringify(state));
}
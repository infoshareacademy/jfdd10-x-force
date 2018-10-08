

function scoreMenu() {
    var scoreTable = document.querySelector('.scoreTable');
    
    var scoreLocalTable = loadGameState();
    scoreLocalTable.forEach( item  => {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        scoreTable.appendChild(tr);
        tr.innerHTML = item.playerName + ' ' + item.score;
        tr.appendChild(td);
    });
}

function loadGameState() {
    return JSON.parse(localStorage.getItem('gameState'));
}

function saveGameState(passedScore, name) {
    var currentResults = loadGameState();
    if (null === currentResults) {
        currentResults = [];
    }

    currentResults.push({ score: passedScore,
    playerName: name });
    localStorage.setItem('gameState', JSON.stringify(currentResults));
}
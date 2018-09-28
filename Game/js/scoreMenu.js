

function scoreMenu() {
    var scoreTable = document.querySelector('.scoreTable');

    
    var scoreLocalTable = loadGameState();
    scoreLocalTable.forEach( item  => {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        scoreTable.appendChild(tr);
        tr.innerHTML = item.score;
        tr.appendChild(td);
        
    });
    console.log(scoreLocalTable);
    console.log(td);    
}


function loadGameState() {
    return JSON.parse(localStorage.getItem('gameState'));
}

function saveGameState(passedScore) {
    var currentResults = loadGameState();
    if (null === currentResults) {
        currentResults = [];
    }

    currentResults.push({ score: passedScore });
    localStorage.setItem('gameState', JSON.stringify(currentResults));
}
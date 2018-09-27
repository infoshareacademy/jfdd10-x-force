

function scoreMenu() {
    var scoreTable = document.querySelector('.scoreTable');
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    var tmp;

    var state = loadGameState();
    console.log(localStorage);
    tmp.innerText = state.score;
    console.log(tmp);

    console.log(scoreTable);
    scoreTable.appendChild(tr);
    console.log(scoreTable);
    console.log(tr);
    tr.appendChild(td);
    td.innerText(state.score);

    console.log(state);
    // if (stopGame(true)) {
    //     var state = loadGameState();
    //     console.log(localStorage);

    //     scoreTable.appendChild(tr);
    //     tr.appendChild(td);
    //     td.innerText(state.score);
    // }



}

function loadGameState() {
    return JSON.parse(localStorage.getItem('gameState'));
}

function saveGameState() {
    // pobież przez logstate game wyniki i przypisyuje do zmiennej która leci do tablicy 
    var localScoreValue = [];
    var state = { score: score };
    console.log('save score', state);
    localStorage.setItem('gameState', JSON.stringify(state));

    // if (localStorage.getItem('', JSON.stringify(state)) === '') {
    //     localScore.push[state];
    // }
    // if (localStorage.getItem('', JSON.stringify(state)) === '') {
    //     // localScoreValue.push[state];
    //     scoreMenu(localScoreValue);
    // }
    // else {
    //     localScoreValue.push[JSON.stringify(state)];
    // }

}
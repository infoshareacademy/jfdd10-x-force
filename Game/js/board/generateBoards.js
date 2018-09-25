function generateBoard() {
    var appContainer = document.querySelector('#app');

    var boardData = [
        '_________________#_________#',
        '_________________#_________#',
        '_p____##_###_____#_________#',
        '______#____#_____#_________#',
        '______#____#_____#####_#####',
        '___####____#________________',
        '___#____e___________________',
        '___#_______#_______#########',
        '___#########_______#________',
        '____________________________',
        '_____________e_____#________',
        '#######__####_####_#________',
        '______#__#_______#_#________',
        '______#__#_______#_#________',
        '______#__#_______#_#________',
        '___e_____#_______#_#________',
        '______#__#_______#_#________',
        '______#__#_______#_#________',


    ]

    var grid = document.createElement('div');
    grid.classList.add('grid');

    appContainer.appendChild(grid);

    for (var j = 0; j < boardData.length; j += 1) {
        var row = document.createElement('div');
        row.classList.add('gridRow');

        grid.appendChild(row);

        var rowData = boardData[j];
        var size = rowData.length;

        for (var i = 0; i < size; i += 1) {
            var cell = document.createElement('div');
            cell.classList.add('gridCell');
            cell.setAttribute('data-x', i)
            cell.setAttribute('data-y', j)
            if (rowData[i] === 'p') {
                cell.classList.add('player');
            }
            if (rowData[i] === '#') {
                cell.classList.add('wall');
            }
            if (rowData[i] === 'e') {
                cell.classList.add('enemy')
            }
            row.appendChild(cell);
        }
    }
}

function generateBadge(){
    
    var freeCells = document.querySelectorAll('.gridCell:not(.wall):not(.player):not(.badge)')
    howManyFreeCells = freeCells.length
    
    var randomNumber = Math.random();
    var randomIndex = Math.floor(randomNumber * howManyFreeCells);
    var randomCell = freeCells[randomIndex];

    randomCell.classList.add('badge');
    return randomCell;
    
}
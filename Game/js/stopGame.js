function stopGame(bool) {
    if (bool === true) {
        saveGameState();
        return;
    }
    return false;
}
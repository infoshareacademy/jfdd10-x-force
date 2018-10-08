function stopGame(value) {
    if (value === true) {
        saveGameState();
    }

    return value;
}
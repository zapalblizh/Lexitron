export const UpdateGrid = (board, currentTurn, gameState, currentWord) => {

    const letters = currentWord.toUpperCase().split("");
    if (letters.length === 0) return;
    const next = board.map(row => row.slice());

    currentTurn.selection.indices.forEach(() => {
        const limit = Math.min(currentTurn.selection.indices.length, letters.length);

        if (currentTurn.selection.direction === "vertical") {
            for (let i = 0; i < limit; i++) {
                next[currentTurn.selection.indices[i]][currentTurn.selection.constant].letter = letters[i];
                next[currentTurn.selection.indices[i]][currentTurn.selection.constant].bonusAvailable = false;
            }
        }
        else if (currentTurn.selection.direction === "horizontal") {
            for (let i = 0; i < limit; i++) {
                next[currentTurn.selection.constant][currentTurn.selection.indices[i]].letter = letters[i];
                next[currentTurn.selection.constant][currentTurn.selection.indices[i]].bonusAvailable = false;
            }
        }
    });

    return next;
}

export const VerifyWord = (board, gameState, currentWord, players, gridSize) => {
    // Checks if word is empty
    if (currentWord.length === 0) {
        return { valid: false, message: 'Enter a word to submit.'};
    }
    // Checks if start and end positions are selected
    if (!(gameState.start.status && gameState.end.status)) {
        return {valid: false, message: 'Select a start and end position for your word.'}
    }

    // Gets selected distance
    const selectedDistance = Math.abs(gameState.end.row - gameState.start.row || gameState.end.col - gameState.start.col) + 1;

    // Compares selected distance with word length
    if (currentWord.length !== selectedDistance) {
        return { valid: false, message: 'Select a correct distance or make word same length as selected distance.'};
    }
    // Checks if word contains only letters, and flags it if not
    if (!(/^[a-zA-Z]+$/.test(currentWord))) {
        return { valid: false, message: 'Word must contain only letters.'};
    }

    // Checks whether rows and columns for start and end positions are different
    if (gameState.start.row !== gameState.end.row && gameState.start.col !== gameState.end.col) {
        return { valid: false, message: 'Select start and end of your word horizontally or vertically.'};
    }

    // Checks whether positioning follows standard writing direction (left to right, top to bottom)
    if (gameState.start.row > gameState.end.row || gameState.start.col > gameState.end.col) {
        return { valid: false, message: 'Select start and end of your word top to bottom or left to right.'};
    }

    // Gets direction of placement
    const direction = gameState.start.row === gameState.end.row ? "horizontal" : "vertical"

    // Checks if it is the first turn, and so checks if center tile is selected
    if (players.every(player => player.score === 0)) {
        const arrayRange = (start, stop, step) =>
            Array.from(
                { length: (stop - start) / step + 1 },
                (value, index) => start + index * step
            );

        let range = [];
        if (direction === "horizontal")
            range = arrayRange(gameState.start.col, gameState.end.col + 1, 1);
        else if (direction === "vertical")
            range = arrayRange(gameState.start.row, gameState.end.row + 1, 1);

        if (!(range.includes(Math.floor(gridSize / 2)))) {
            return { valid: false, message: 'Include the center tile in your word placement for the first turn.'};
        }
    }

    // TODO: Check letters outside word range to avoid issues in the future

    // TODO: Update code to more effectively check for conflicts in word placement
    // Check tiles of placement for word
    // If start and end equal in row position, then horizontal, otherwise vertical
    const isHorizontal = gameState.start.row === gameState.end.row;
    const wordStart = isHorizontal ? Math.min(gameState.start.col, gameState.end.col) : Math.min(gameState.start.row, gameState.end.row);

    let connectionFound = false;
    let conflictFound = false;
    const letters = currentWord.toUpperCase().split("");

    for (let i = 0; i < currentWord.length; i++) {
        let axis = wordStart + i;
        const currentRow = isHorizontal ? gameState.start.row : axis;
        const currentCol = isHorizontal ? axis : gameState.start.col;

        const boardLetter = board[currentRow][currentCol].letter;
        const newLetter = letters[i];

        if (boardLetter !== '') {
            if (boardLetter === newLetter) {
                if (!connectionFound)
                    connectionFound = true;
            }
            else {
                conflictFound = true;
                break;
            }
        }

    }

    if (conflictFound) {
        return { valid: false, message: 'Please select a word that fits in the selected tiles and does not replace existing letters.'};
    }

    return {valid: true, message: ''};
}
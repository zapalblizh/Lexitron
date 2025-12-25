export const VerifyWord = (board, gameState, currentWord, players, gridSize, wordDict) => {
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
    const arrayRange = (start, stop, step) =>
        Array.from(
            { length: (stop - start) / step + 1 },
            (value, index) => start + index * step
        );

    let wordRange = direction === "horizontal"
        ? arrayRange(gameState.start.col, gameState.end.col + 1, 1)
        : arrayRange(gameState.start.row, gameState.end.row + 1, 1);

    // Checks if it is the first turn, and so checks if center tile is selected
    if (players.every(player => player.score === 0)) {
        if (!(wordRange.includes(Math.floor(gridSize / 2)))) {
            return { valid: false, message: 'Include the center tile in your word placement for the first turn.'};
        }
    }

    // Checks for conflicts with existing letters and outside range to make sure word is valid in that position
    let inc = 0;
    if (direction === "horizontal") {
        // Conflict verifier
        for (let key in wordRange) {
            let letter = board[gameState.start.row][key].letter;
            if (letter !== '' && letter !== currentWord[inc])
                return { valid: false, message: 'Select a word that fits in the selected tiles and does not replace existing letters.'};
            inc++;
        }
        // Checks outside selection for possible conflicts
        for (let key in [gameState.start.col - 1, gameState.end.col - 1]) {
            switch (key) {
                case (0): break;
                case (14): break;
                default:
                    if (board[gameState.start.row][key].letter !== '')
                        return { valid: false, message: 'Your word touches another letter in the grid that is outside your selection. If this letter is part of your word, extend your selection. Otherwise, choose a different position where to place your word.'};
            }
        }
    }
    else if (direction === "vertical") {
        // Conflict verifier
        for (let key in wordRange) {
            let letter = board[key][gameState.start.col].letter;
            if (letter !== '' && letter !== currentWord[inc])
                return { valid: false, message: 'Select a word that fits in the selected tiles and does not replace existing letters.'};
            inc++;
        }
        // Checks outside selection for possible conflicts
        for (let key in [gameState.start.row - 1, gameState.end.row - 1]) {
            switch (key) {
                case (0): break;
                case (14): break;
                default:
                    if (board[key][gameState.start.col].letter !== '')
                        return { valid: false, message: 'Your word touches another letter in the grid that is outside your selection. If this letter is part of your word, extend your selection. Otherwise, choose a different position where to place your word.'};
            }
        }
    }

    // Check if word is in dictionary
    if (!wordDict.has(currentWord.toUpperCase())) {
        return { valid: false, message: 'Please enter a word that is included in the English dictionary.'};
    }

    return {valid: true, message: ''};
}
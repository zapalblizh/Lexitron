import {useUpdateGrid} from "./UpdateGrid.js";

export const WordExistsInDict = (board, wordDict, currentTurn, gameState, currentWord, SIZE_OF_GRID) => {
    let selection;
    let word = currentWord;

    // Verifies if word exists even if it is inserted before or after existing letters in the grid
    const newBoard = useUpdateGrid(board, currentTurn, gameState, word);

    // Case for row word
    if (gameState.start.row === gameState.end.row) {
        selection = newBoard[gameState.start.row];

        // Start from before start of word
        for (let i = gameState.start.col - 1; i >= 0; i--) {
            let letter = newBoard[gameState.start.row][i].letter;
            if (letter) word = letter + currentWord;
            else break;
        }
        // Start from after end of word
        for (let j = gameState.end.col + 1; j < SIZE_OF_GRID; j++) {
            let letter = newBoard[gameState.start.row][j].letter;
            if (letter) word = currentWord + letter;
            else break;
        }
    }
    // Case for column word
    else if (gameState.start.col === gameState.end.col) {
        selection = newBoard.map(row => row[gameState.start.col]);

        // Start from before start of word
        for (let i = gameState.start.row - 1; i >= 0; i--) {
            let letter = newBoard[i][gameState.start.row].letter;
            if (letter) word = letter + currentWord;
            else break;
        }
        // Start from after end of word
        for (let j = gameState.end.row + 1; j < SIZE_OF_GRID; j++) {
            let letter = newBoard[j][gameState.start.row].letter;
            if (letter) word = currentWord + letter;
            else break;
        }
    }

    return wordDict.has(word.toUpperCase());
}
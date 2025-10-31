import {useContext} from "react";
import {GameContext} from "../GameContext.jsx";

export const VerifyWordPosition = () => {
    const {board, gameState, currentWord, players, SIZE_OF_GRID, setErrorMessage} = useContext(GameContext);

    // Basic verification for errors in creation or selection
    if (!(/^[a-zA-Z]+$/.test(currentWord.word))) {
        setErrorMessage('Word must contain only letters.')
        // Add reset for selection only
        return false;
    }

    if (!gameState.start.status || !gameState.end.status || (gameState.start.row !== gameState.end.row && gameState.start.col !== gameState.end.col)) {
        setErrorMessage('Please select start and end of your word horizontally or vertically.')
        return false;
    }

    if (gameState.start.row > gameState.end.row || gameState.start.col > gameState.end.col) {
        setErrorMessage('Please select start and end of your word top to bottom or left to right.')
        return false;
    }

    const selectedDistance = Math.abs(gameState.end.row - gameState.start.row || gameState.end.col - gameState.start.col) + 1;

    if (currentWord.word.length === 0) {
        setErrorMessage('Please enter a word to submit.')
        return false;
    }
    if (currentWord.word.length !== selectedDistance) {
        setErrorMessage('Please select a correct distance or make word same length as selected distance.')
        return false;
    }

    // Check tiles of placement for word
    // If start and end equal in row position, then horizontal, otherwise vertical
    const isHorizontal = gameState.start.row === gameState.end.row ;
    const wordStart = isHorizontal ? Math.min(gameState.start.col, gameState.end.col) : Math.min(gameState.start.row, gameState.end.row);

    let centerFound = false;
    let connectionFound = false;
    let conflictFound = false;
    const center = Math.floor(SIZE_OF_GRID / 2);
    const letters = currentWord.word.toUpperCase().split("");

    for (let i = 0; i < currentWord.word.length; i++) {
        let axis = wordStart + i;
        const currentRow = isHorizontal ? gameState.start.row : axis;
        const currentCol = isHorizontal ? axis : gameState.start.col;

        // For first turn
        if (players.every(player => player.score === 0)) {
            if (currentRow === center && currentCol === center) {
                centerFound = true;
            }
        }

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

    if (players.every(p => p.score === 0) && !centerFound) {
        setErrorMessage('Please select your tiles to have center tile between initial and ending tiles')
        return false;
    }
    else if (conflictFound) {
        setErrorMessage('Please select a word that fits in the selected tiles and does not replace existing letters.')
        return false;
    }

    return true;
}
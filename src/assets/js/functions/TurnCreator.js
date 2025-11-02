import multipliers from "../../_data/multipliers.js"
import points from "../../_data/game.js";

// Calculates word score based on bonuses and letter points
const calculateWordScore = (bonusList, currentWord) => {
    let score = 0;

    const letterArr = currentWord.toUpperCase().split("");

    // Counts word score
    for (let i = 0; i < letterArr.length; i++) {
        for (const [key, value] of Object.entries(points) ) {
            if (value.includes(letterArr[i]) && bonusList[i].slice(0, 2) === 'lx') {
                score = score + (key * bonusList[i].slice(2));
            }
        }
    }

    if (bonusList.some(bonus => bonus.slice(0, 2) !== 'wx')) {
        score = score * bonusList.filter(bonus => bonus.slice(0, 2) === 'wx').slice(2);
    }

    return score;
}

// Creates a turn object
export const CreateTurn = (turns, players, gameState, currentWord) => {

    // Function to create turn object
    const currentTurn = {
        turn: turns.length + 1,
        playerId: players.filter(player => player.currentPlayer).id,
        selection: {
            direction: gameState.start.row === gameState.end.row ? "horizontal" : "vertical",
            indices: Array.from({length: currentWord.length}, (_, i) => {
                if (gameState.start.row === gameState.end.row) {
                    return Math.min(gameState.start.col, gameState.end.col) + i;
                }
                else {
                    return Math.min(gameState.start.row, gameState.end.row) + i;
                }
            }),
            constant: gameState.start.row === gameState.end.row ? gameState.start.row : gameState.start.col,
        },
        bonusList: [],
        word: currentWord,
        wordScore: 0
    }

    currentTurn.bonusList = []

    multipliers.filter(multiplier => {

        if (currentTurn.selection.direction === "horizontal" &&
            currentTurn.selection.row === multiplier[0] &&
            currentTurn.selection.indices.includes(multiplier[1])) {

            currentTurn.bonusList.push(multiplier[2]);
        }
        else if (currentTurn.selection.direction === "vertical" &&
            currentTurn.selection.col === multiplier[1] &&
            currentTurn.selection.indices.includes(multiplier[0])) {

            currentTurn.bonusList.push(multiplier[2]);
        }
        else {
            currentTurn.bonusList.push("");
        }
    });

    currentTurn.wordScore = calculateWordScore(currentTurn.bonusList, currentWord);

    return currentTurn;
}
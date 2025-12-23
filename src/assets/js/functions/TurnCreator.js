import multipliers from "../../_data/multipliers.js"
import points from "../../_data/game.js";

// Calculates word score based on bonuses and letter points
const calculateWordScore = (bonusList, currentWord) => {
    let score = 0;

    const letterArr = currentWord.toUpperCase().split("");

    // Counts word score
    for (let i = 0; i < letterArr.length; i++) {
        for (const [key, value] of Object.entries(points) ) {
            if (value.includes(letterArr[i]) && bonusList[i].includes('lx')) {
                score += (parseInt(key) * bonusList[i].slice(2));
                // console.log('inside if', score);
            }
            else if (value.includes(letterArr[i])) {
                score += parseInt(key);
                // console.log('inside else', score);
            }
        }
    }

    bonusList.forEach((bonus) => {
        if (bonus && bonus.startsWith("wx")) {
            score *= bonus.slice(2);
        }
    });

    // TODO: Check if new word adds 7 new letters to the board

    return score;
}

// Creates a turn object
export const CreateTurn = (turns, players, gameState, currentWord) => {
    // Mapping multipliers into row-col to multiplier pairs
    const bonusAt = new Map(multipliers.map(([row, col, multiplier]) => [`${row},${col}`, multiplier]));

    // Function to create turn object
    let currentTurn = {
        turnId: turns.length + 1,
        playerId: players.find(player => player.currentPlayer)?.id,
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
        bonusWords: [],
        wordScore: 0,
    }

    currentTurn.bonusList = currentTurn.selection.indices.map(idx => {
        const key = currentTurn.selection.direction ? `${currentTurn.selection.constant},${idx}` : `${idx},${currentTurn.selection.constant}`;
        return bonusAt.get(key) ?? "";
    });

    currentTurn.wordScore = calculateWordScore(currentTurn.bonusList, currentWord);

    return currentTurn;
}

import multipliers from "../../_data/multipliers.js"
import points from "../../_data/game.js";

// Calculates word score based on bonuses and letter points
const calculateWordScore = (bonusList, currentWord) => {
    let score = 0;

    const letterArr = currentWord.toUpperCase().split("");

    // Counts word score
    for (let i = 0; i < currentWord.length; i++) {
        for (const [key, value] of Object.entries(points) ) {
            if (bonusList[i].available &&
                (value.includes(letterArr[i])
                    && bonusList[i].multiplier.includes('lx'))) {
                score += (parseInt(key) * bonusList[i].multiplier.slice(2));
            }
            else if (value.includes(letterArr[i])) {
                score += parseInt(key);
            }
        }
    }

    bonusList.forEach((bonus) => {
        if (bonus.available && bonus.multiplier.startsWith("wx")) {
            score *= bonus.slice(2);
        }
    });

    // TODO: Check if new word adds 7 new letters to the board

    return score;
}

// Creates a turn object
export const CreateTurn = (board, turns, players, gameState, currentWord) => {
    // Mapping multipliers into row-col to multiplier pairs
    const bonusAt = new Map(multipliers.map(([row, col, multiplier]) => [`${row},${col}`, multiplier ]));

    // TODO: Verify if bonusList is done well, and possibly modify to be better
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
        wordScore: 0,
    }

    currentTurn.bonusList = currentTurn.selection.indices.map(idx => {
        const key = currentTurn.selection.direction === "horizontal"
            ? `${currentTurn.selection.constant},${idx}`
            : `${idx},${currentTurn.selection.constant}`;

        const bonusVal = bonusAt.get(key); // may be undefined or a string like "lx2"
        const multiplier = typeof bonusVal === "string" ? bonusVal : "none";

        const available = currentTurn.selection.direction === "horizontal"
            ? board[currentTurn.selection.constant][idx].bonusAvailable
            : board[idx][currentTurn.selection.constant].bonusAvailable;

        return {
            multiplier,
            available
        };
    });


    currentTurn.wordScore = calculateWordScore(currentTurn.bonusList, currentWord);

    return currentTurn;
}

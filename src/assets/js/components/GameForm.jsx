import { useContext } from "react";
import { GameContext } from "../GameContext.jsx";
import { VerifyWordPosition } from "../functions/VerifyWordPosition.jsx"
import { ResetGameState } from "../functions/ResetGameState.jsx";

function GameForm() {

    const {turns, setTurn, wordDict, errorMessage, setErrorMessage, players, setPlayers, gameState, setGameState, currentWord, setCurrentWord} = useContext(GameContext);

    // Handles Submission of a Word from Form
    function HandleSubmit(e) {
        e.preventDefault();

        const uppercaseWord = currentWord.word.toUpperCase();

        // Returns alerts and true when passes through all checks
        const isValid = VerifyWordPosition();

        if (isValid && wordDict.has(uppercaseWord)) {

            const currentTurn = {
                turn: turns.length + 1,
                player: players.filter(player => player.currentPlayer),
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
                word: currentWord.word,
                wordScore: 0
            }

            // Calculate word score

            // Update turns list

            // Check for bonus words created

            // Per word, do same turn addition to array + score calculation

            // Update grid

            // Update player in players array

            // Change players to next player

            // Reset gameState and currentWord
        }
        else {
            if (!wordDict.has(uppercaseWord)) {
                setErrorMessage('Please enter a word that is included in the English dictionary.')
            }

            ResetGameState();
        }
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <form onSubmit={HandleSubmit} className="mt-4 flex items-center gap-2">
                <input
                    type="text"
                    value={currentWord.word}
                    onChange={word => setCurrentWord({
                        ...currentWord,
                        word: word.target.value
                    })}
                    placeholder="Insert your word here"
                    className="border rounded px-3 py-2"
                />
                <button type="submit"
                        className="px-3 py-2 rounded bg-blue-600 text-white">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default GameForm;

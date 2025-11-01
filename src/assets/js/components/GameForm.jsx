import { useContext } from "react";
import { GameContext } from "../GameContext.jsx";
import multipliers from "../../_data/multipliers.js"
import { VerifyWordPosition } from "../functions/VerifyWordPosition.jsx"
import { ResetGameState } from "../functions/ResetGameState.jsx";
import { CalculateWordScore } from "../functions/CalculateWordScore.jsx";
import { SeekWordsCreated } from "../functions/SeekWordsCreated.jsx";
import {UpdateGrid} from "../functions/UpdateGrid.jsx";
import {PlayerSelector} from "./PlayerSelector.jsx";

function GameForm() {

    const {turns, setTurn, wordDict, errorMessage, setErrorMessage, players, setPlayers, gameState, setGameState, currentWord, setCurrentWord} = useContext(GameContext);

    // Handles Submission of a Word from Form
    function HandleSubmit(e) {
        e.preventDefault();

        const uppercaseWord = currentWord.toUpperCase();

        // Returns alerts and true when passes through all checks
        const isValid = VerifyWordPosition();

        if (isValid && wordDict.has(uppercaseWord)) {

            let turnsIntroduced = [];

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
            });

            currentTurn.wordScore = CalculateWordScore(currentTurn.bonusList);

            turnsIntroduced.push(currentTurn);

            UpdateGrid(currentTurn);

            // TODO: Check for bonus words created
            // turnsIntroduced = turnsIntroduced.concat(turnsIntroduced, SeekWordsCreated(currentTurn.selection));

            // Update player in players array
            currentTurn.player.turns.push(turnsIntroduced);

            // Add turn to turns array
            setTurn(prev => {
                return [...prev, currentTurn];
            });

            // Reset gameState and currentWord
            ResetGameState();
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
                <div className="flex items-center justify-center gap-4">
                    <PlayerSelector />
                </div>
                <input
                    type="text"
                    value={currentWord}
                    onChange={word => setCurrentWord(word.target.value)}
                    placeholder="Insert your word here"
                    className="border rounded px-3 py-2"
                />
                <button type="submit"
                        className="px-3 py-2 rounded bg-blue-600 text-white">
                    <span>Submit</span>
                </button>
            </form>
        </div>
    )
}

export default GameForm;

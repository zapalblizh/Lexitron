import { useContext } from "react";
import { GameContext } from "../GameContext.jsx";
import multipliers from "../../_data/multipliers.js"
import { useVerifyWordPosition } from "../functions/VerifyWordPosition.js"
import {useUpdateGrid} from "../functions/UpdateGrid.js";
import {PlayerSelector} from "./PlayerSelector.jsx";
import {CreateTurn} from "../functions/TurnCreator.js";

function GameForm() {

    const {turns, setTurn, wordDict, errorMessage, setErrorMessage, players, setPlayers, gameState, setGameState, currentWord, setCurrentWord, board, setBoard, SIZE_OF_GRID} = useContext(GameContext);

    // Handles Submission of a Word from Form
    function HandleSubmit(e) {
        e.preventDefault();

        const uppercaseWord = currentWord.toUpperCase();

        // Returns alerts and true when passes through all checks
        const isValid = useVerifyWordPosition(board, gameState, currentWord, players, SIZE_OF_GRID);

        if (isValid && wordDict.has(uppercaseWord)) {

            let turnsIntroduced = [];

            // Insert here magic function
            const currentTurn = CreateTurn(turns, players, gameState, currentWord);

            turnsIntroduced.push(currentTurn);

            setBoard(prev => {
                return useUpdateGrid(prev, currentTurn, gameState, currentWord);
            })

            // TODO: Check for bonus words created
            // turnsIntroduced = turnsIntroduced.concat(turnsIntroduced, useSeekWordsCreated(currentTurn.selection));

            // Update player in players array
            setPlayers(prev =>
                prev.map(player =>
                    player.id === currentTurn.playerId
                        ? { ...player, turns: [...player.turns, ...turnsIntroduced] }
                        : player
                )
            );

            // Add turn to turns array
            setTurn(prev => {
                return [...prev, ...turnsIntroduced];
            });

            // Reset gameState and currentWord
            setGameState({
                start: {
                    status: false,
                    row: null,
                    col: null
                },
                end: {
                    status: false,
                    row: null,
                    col: null
                }
            })
            setCurrentWord("");
        }
        else {
            if (!wordDict.has(uppercaseWord)) {
                setErrorMessage('Please enter a word that is included in the English dictionary.')
            }

            // Reset gameState and currentWord
            setGameState({
                start: {
                    status: false,
                    row: null,
                    col: null
                },
                end: {
                    status: false,
                    row: null,
                    col: null
                }
            })
            setCurrentWord("");
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

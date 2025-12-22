import { useContext } from "react";
import { GameContext } from "../GameContext.jsx";
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

            // TODO: Check for bonus words created

            // Calculate total score for the turn for player
            let totalTurnScore = 0;
            for (const turn of turnsIntroduced) {
                totalTurnScore += turn.wordScore;
            }

            // Update player in players array
            setPlayers(prev =>
                prev.map(player =>
                    player.id === currentTurn.playerId
                        ? { ...player, score: totalTurnScore, turns: [...player.turns, ...turnsIntroduced] }
                        : player
                )
            );

            // Add turn to turns array
            setTurn(prev => {
                return [...prev, ...turnsIntroduced];
            });

            setBoard(prev => {
                return useUpdateGrid(prev, currentTurn, gameState, currentWord);
            })

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
        <div className="flex flex-col gap-2">
            <span className="text-2xl font-bold">Play a Word</span>

            <form onSubmit={HandleSubmit} className="w-full mx-auto flex flex-col justify-center items-center gap-4 p-4 bg-cursor border-skin-600 border-2 rounded-xl">
                <div className="flex flex-wrap items-center justify-center gap-4">
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
                        className="btn-submit">
                    <span>Submit</span>
                </button>
            </form>
        </div>
    )
}

export default GameForm;

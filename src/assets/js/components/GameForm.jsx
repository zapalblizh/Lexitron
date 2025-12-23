import { useContext } from "react";
import { GameContext } from "../GameContext.jsx";
import { useVerifyWordPosition } from "../functions/VerifyWordPosition.js"
import {useUpdateGrid} from "../functions/UpdateGrid.js";
import {PlayerSelector} from "./PlayerSelector.jsx";
import {CreateTurn} from "../functions/TurnCreator.js";
import {ErrorComponent} from "./ErrorComponent.jsx";
import {WordExistsInDict} from "../functions/WordExistsInDict.js";

function GameForm() {

    const {turns, currentTurn, setTurn, wordDict, errorMessage, setErrorMessage, players, setPlayers, gameState, setGameState, currentWord, setCurrentWord, board, setBoard, SIZE_OF_GRID} = useContext(GameContext);

    // Handles Submission of a Word from Form
    function HandleSubmit(e) {
        e.preventDefault();

        const uppercaseWord = currentWord.toUpperCase();

        let currentTurn = {};

        if (gameState.start.status && gameState.end.status)
            currentTurn = CreateTurn(turns, players, gameState, currentWord);
        else setErrorMessage('Please select a start and end position for your word.');

        // Returns alerts and true when passes through all checks
        const positionValid = useVerifyWordPosition(board, gameState, currentWord, players, SIZE_OF_GRID);

        const validWord = positionValid && WordExistsInDict(board, wordDict, currentTurn, gameState, currentWord, SIZE_OF_GRID);

        if (validWord) {
            let turnsIntroduced = [];

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
            if (!validWord) {
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
                <ErrorComponent />

                <button type="submit"
                        className="btn-submit">
                    <span>Submit</span>
                </button>
            </form>
        </div>
    )
}

export default GameForm;

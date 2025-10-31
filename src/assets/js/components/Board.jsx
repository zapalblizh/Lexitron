import {GameContext} from "../GameContext.jsx";
import {useContext} from "react";
import {ResetGameState} from "../functions/ResetGameState.jsx";
import { nanoid } from "nanoid";

export const Board = () => {
    const {board, SIZE_OF_GRID, gameStart, gameState, setGameState} = useContext(GameContext);

    const UpdateSelectionStatus = (row, col) => {
        const newStart = {};
        const newEnd = {};

        if (!gameState.start.status) {
            newStart.status = true;
            newStart.row = row;
            newStart.col = col;
        }
        else if (gameState.start.row === row && gameState.start.col === col) {
            newStart.status = false;
            newStart.row = 0;
            newStart.col = 0;
        }
        else if (!gameState.end.status) {
            newEnd.status = true;
            newEnd.row = row;
            newEnd.col = col;
        }
        else if (gameState.end.row === row && gameState.end.col === col) {
            newEnd.status = false;
            newEnd.row = 0;
            newEnd.col = 0;
        }
        else {
            ResetGameState();
        }

        setGameState({
            start: newStart,
            end: newEnd,
        });
    }

    // Renders grid and rerenders grid on any useState update
    return (
        <div className="flex justify-center items-center">
            <div className="grid border w-fit" style={{gridTemplateColumns: `repeat(${SIZE_OF_GRID}, 1fr)`,}}>
                {board.map((rowArr, row) =>
                    rowArr.map((cell, col) => {
                        const isStart = gameState.start.row === row && gameState.start.col === col;
                        const isEnd = gameState.end.row === row && gameState.end.col === col;

                        const selectedClass = isStart ? "select-start border-2 md:border-4 border-green-500"
                            : isEnd ? "select-end border-2 md:border-4 border-red-500"
                                : "";

                        return (
                            <div onClick={() => UpdateSelectionStatus(row, col)} key={nanoid()} data-row={row} data-col={col}
                                 className={`tile ${board[row][col].bonus} ${selectedClass}`}>
                                <button className="w-full h-full" disabled={!gameStart}>
                                    <span className={'tile-text'}>{board[row][col].letter}</span>
                                </button>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

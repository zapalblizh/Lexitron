import {GameContext} from "../GameContext.jsx";
import {useContext, useCallback} from "react";

const INITIAL_TURN = {
    status: false,
    row: null,
    col: null
};

const INITIAL_GAME_STATE = {
    start: INITIAL_TURN,
    end: INITIAL_TURN
};

export const Board = () => {
    const {board, SIZE_OF_GRID, gameStart, gameState, setGameState, setCurrentWord} = useContext(GameContext);

    const UpdateSelectionStatus = useCallback((row, col) => {
        setGameState(prev => {
            const { start, end } = prev;

            if (!start.status) {
                return { start: { status: true, row, col }, end };
            }

            if (start.row === row && start.col === col) {
                return { start: { ...INITIAL_TURN }, end };
            }

            if (!end.status) {
                return { start, end: { status: true, row, col } };
            }

            if (end.row === row && end.col === col) {
                return { start, end: { ...INITIAL_TURN } };
            }

            return { ...INITIAL_GAME_STATE };
        });
    }, [setGameState, setCurrentWord]);

    // Renders grid and rerenders grid on any useState update
    return (
        <div className="flex justify-center items-center">
            <div className="grid border border-skin-600  w-fit" style={{gridTemplateColumns: `repeat(${SIZE_OF_GRID}, 1fr)`,}}>
                {board.map((rowArr, row) =>
                    rowArr.map((cell, col) => {
                        const isStart = gameState.start.row === row && gameState.start.col === col;
                        const isEnd = gameState.end.row === row && gameState.end.col === col;

                        const selectedClass = isStart ? "select-start border-2 md:border-4 border-green-500"
                            : isEnd ? "select-end border-2 md:border-4 border-red-500"
                                : "";

                        return (
                            <div onClick={() => UpdateSelectionStatus(row, col)} key={`${row}-${col}`} data-row={row} data-col={col}
                                 className={`tile border-board-lines ${board[row][col].bonus || ""} ${selectedClass}`}>
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

import { UseGame } from "./App.jsx";

export default function Board() {
    const {
        board, SIZE_OF_GRID, start, setStart, end, setEnd, gameStart, startSelected, setStartSelected,
        endSelected, setEndSelected, ResetSelection
    } = UseGame();

    // Adds border to tile depending on what states are enabled
    function UpdateState(row, col) {
        if (!startSelected) {
            setStartSelected(true);
            setStart([row, col]);
        }
        else if (start[0] === row && start[1] === col) {
            setStartSelected(false);
            setStart([]);
        }
        else if (!endSelected) {
            setEndSelected(true);
            setEnd([row, col]);
        }
        else if (end[0] === row && end[1] === col) {
            setEndSelected(false);
            setEnd([]);
        }
        else {
            ResetSelection();
        }
    }

    // Renders grid and rerenders grid on any useState update
    return (
        <>
            <div className="grid border" style={{gridTemplateColumns: `repeat(${SIZE_OF_GRID}, 1fr)`,}}>
                {board.map((rowArr, row) =>
                    rowArr.map((cell, col) => {
                        const isStart = start[0] === row && start[1] === col;
                        const isEnd = end[0] === row && end[1] === col;
                        const id = row.toString() + '-' + col.toString();

                        const selectedClass = isStart ? "select-start border-2 md:border-4 border-green-500"
                            : isEnd ? "select-end border-2 md:border-4 border-red-500"
                                : "";

                        return (
                            <div onClick={() => UpdateState(row, col)} key={id} data-row={row} data-col={col}
                                 className={`tile ${board[row][col].bonus} ${selectedClass}`}>
                                <button className="w-full h-full" disabled={!gameStart}>
                                    <span className={'tile-text'}>{board[row][col].letter}</span>
                                </button>
                            </div>
                        );
                    })
                )}
            </div>
        </>
    );
}

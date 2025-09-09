import multipliers from "../_data/multipliers.js";
import {useState} from "react";

const SIZE_OF_GRID = 15;

export default function Board() {

    // States for selecting starting and ending tiles
    const [startSelected, setStartSelected] = useState(false);
    const [endSelected, setEndSelected] = useState(false);

    // States for coordinates of start and end of word
    const [start, setStart] = useState([]); // [row, col]
    const [end, setEnd] = useState([]); // [row, col]

    // Word from from input state
    const [word, setWord] = useState('');


    // 2D board
    const [board, setBoard] = useState(
        () => Array.from({ length: SIZE_OF_GRID }, () => Array(SIZE_OF_GRID).fill(""))
    );

    // Resets all States
    function ResetSelection() {
        setStartSelected(false);
        setEndSelected(false);
        setStart([]);
        setEnd([]);
        setWord('');
    }

    // Handles Submission of a Word from Form
    const HandleSubmit = (e) => {
        e.preventDefault();

        // Check if start or end are not defined
        if (start.length !== 2 || end.length !== 2) {
            ResetSelection();
            return alert('Please select start and end of your word horizontally or vertically.');
        }

        // Horizontal Direction
        if (start[0] === end[0]) {
            const constantRow = start[0];

            // Gets amount of coordinates
            const colStart = Math.min(start[1], end[1]);
            const colEnd = Math.max(start[1], end[1]);
            const length = colEnd - colStart + 1;

            UpdateDisplayGrid({
                direction: "horizontal", // same row -> horizontal
                constant: constantRow,
                indices: Array.from({ length: length }, (_, i) => colStart + i),
                word: word
            });
        }

        // Vertical Direction
        else if (start[1] === end[1]) {
            const constantCol = start[1];

            // Gets amount of coordinates
            const rowStart = Math.min(start[0], end[0]);
            const rowEnd = Math.max(start[0], end[0]);
            const length = rowEnd - rowStart + 1;

            UpdateDisplayGrid({
                direction: "vertical", // same col -> vertical
                constant: constantCol,
                indices: Array.from({ length: length }, (_, i) => rowStart + i),
                word: word
            });
        }

        // In case of some error (mainly no proper direction), falls into else
        else {
            ResetSelection();
            alert("Please select start and end of your word horizontally or vertically.");
        }
    }

    function UpdateDisplayGrid({ direction, constant, indices, word }) {
        console.log(word);

        const letters = word.toUpperCase().split("");

        if (letters.length === 0) return;

        // Update Board with word insertion
        setBoard(prev => {
            const next = prev.map(row => row.slice());
            const limit = Math.min(indices.length, letters.length);

            if (direction === "vertical") {
                for (let i = 0; i < limit; i++) {
                    next[indices[i]][constant] = letters[i];
                }
            }
            else if (direction === "horizontal") {
                for (let i = 0; i < limit; i++) {
                    next[constant][indices[i]] = letters[i];
                }
            }

            return next;
        });

        ResetSelection();
    }

    // Adds border to tile depending on what states are enabled
    const UpdateState = (row, col) => {
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
    };

    // Renders grid and rerenders grid on any useState update
    return (
        <>
            <div className="grid border" style={{gridTemplateColumns: `repeat(${SIZE_OF_GRID}, 1fr)`,}}>
                {board.map((rowArr, row) =>
                    rowArr.map((cell, col) => {
                        const bonus = multipliers.find(([r, c]) => r === row && c === col)?.[2] ?? '';

                        const isStart = start[0] === row && start[1] === col;
                        const isEnd = end[0] === row && end[1] === col;
                        const id = row.toString() + '-' + col.toString();

                        const selectedClass = isStart ? "select-start border-2 md:border-4 border-green-500"
                            : isEnd ? "select-end border-2 md:border-4 border-red-500"
                                : "";

                        return (
                            <div onClick={() => UpdateState(row, col)} key={id} data-row={row} data-col={col}
                                 className={`tile ${bonus} ${selectedClass}`}>
                                <button className="w-full h-full">
                                    <span className={'tile-text'}>{board[row][col]}</span>
                                </button>
                            </div>
                        );
                    })
                )}
            </div>

            <form onSubmit={HandleSubmit} className="mt-4 flex items-center gap-2">
                <input
                    type="text"
                    value={word}
                    onChange={word => setWord(word.target.value)}
                    placeholder="Word (optional)"
                    className="border rounded px-3 py-2"
                />
                <button type="submit"
                    className="px-3 py-2 rounded bg-blue-600 text-white disabled:opacity-50">
                    Submit
                </button>
            </form>
        </>
    );
}

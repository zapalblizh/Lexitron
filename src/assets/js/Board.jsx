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

    function VerifyInput() {
        if (!(/^[a-zA-Z]+$/.test(word)) || typeof word !== 'string') {
            alert('Word must contain only letters.')
            return false;
        }
        if (start.length !== 2 || end.length !== 2 || (start[0] !== end[0] && start[1] !== end[1])) {
            alert('Please select start and end of your word horizontally or vertically.');
            return false;
        }

        const selectedDistance = (start[0] === end[0] ? end[1] - start[1] : end[0] - start[0]) + 1;

        if (word.length === 0) {
            alert('Please enter a word to submit.');
            return false;
        }
        if (word.length !== selectedDistance) {
            alert('Please select a correct distance or make word same length as selected distance.');
            return false;
        }

        return true;
    }

    // Handles Submission of a Word from Form
    function HandleSubmit(e) {
        e.preventDefault();

        // Returns alerts and true when passes through all checks
        const isValid = VerifyInput();

        if (isValid) {
            // Constants for grid update
            const direction = start[0] === end[0] ? "horizontal" : "vertical";
            const axis = direction === "horizontal" ? start[0] : start[1];
            const wordStart = direction === "horizontal" ? Math.min(start[1], end[1]) : Math.min(start[0], end[0]);

            // console.log(direction, axis, wordStart, word);

            UpdateDisplayGrid({
                direction: direction,
                constant: axis,
                indices: Array.from({ length: word.length }, (_, i) => wordStart + i),
                word: word
            });
        }
        else {
            // Resets values when VerifyInput returns false
            ResetSelection();
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

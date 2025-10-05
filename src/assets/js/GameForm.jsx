import {UseGame} from "./App.jsx";

function GameForm() {

    const { UpdateDisplayGrid, ResetSelection, start, end, gameStart, errorMessage, setErrorMessage, players, board, SIZE_OF_GRID } = UseGame();

    // Checks word for validity
    function VerifyWordPosition() {

        // Basic verification for errors in creation or selection
        if (!(/^[a-zA-Z]+$/.test(word)) || typeof word !== 'string') {
            setErrorMessage('Word must contain only letters.')
            // Add reset for selection only
            return false;
        }
        if (start.length !== 2 || end.length !== 2 || (start[0] !== end[0] && start[1] !== end[1])) {
            setErrorMessage('Please select start and end of your word horizontally or vertically.')
            return false;
        }

        if (start[0] > end[0] || start[1] > end[1]) {
            setErrorMessage('Please select start and end of your word top to bottom or left to right.')
            return false;
        }

        const selectedDistance = (start[0] === end[0] ? end[1] - start[1] : end[0] - start[0]) + 1;

        if (word.length === 0) {
            setErrorMessage('Please enter a word to submit.')
            return false;
        }
        if (word.length !== selectedDistance) {
            setErrorMessage('Please select a correct distance or make word same length as selected distance.')
            return false;
        }

        // Check tiles of placement for word
        // If start and end equal in row position, then horizontal, otherwise vertical
        const isHorizontal = start[0] === end[0];
        const wordStart = isHorizontal ? Math.min(start[1], end[1]) : Math.min(start[0], end[0]);

        let centerFound = false;
        let connectionFound = false;
        let conflictFound = false;
        const center = Math.floor(SIZE_OF_GRID / 2);
        const letters = word.toUpperCase().split("");

        for (let i = 0; i < word.length; i++) {
            let axis = wordStart + i;
            const currentRow = isHorizontal ? start[0] : axis;
            const currentCol = isHorizontal ? axis : start[1];

            // For first turn
            if (players.every(p => p.score === 0)) {
                if (currentRow === center && currentCol === center) {
                    centerFound = true;
                }
            }

            const boardLetter = board[currentRow][currentCol].letter;
            const newLetter = letters[i];

            if (boardLetter !== '') {
                if (boardLetter === newLetter) {
                    if (!connectionFound)
                        connectionFound = true;
                }
                else {
                    conflictFound = true;
                    break;
                }
            }

        }

        if (players.every(p => p.score === 0) && !centerFound) {
            setErrorMessage('Please select your tiles to have center tile between initial and ending tiles')
            return false;
        }
        else if (conflictFound) {
            setErrorMessage('Please select a word that fits in the selected tiles and does not replace existing letters.')
            return false;
        }

        return true;
    }

    function WordCheck() {

    }

    // Handles Submission of a Word from Form
    function HandleSubmit(e) {
        e.preventDefault();

        // Returns alerts and true when passes through all checks
        const isValid = VerifyWordPosition();

        if (isValid) {
            WordCheck();

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

    const { word, setWord } = UseGame();

    return (
        <div className={`${gameStart ? 'block' : 'hidden'} flex flex-col justify-center items-center`}>
            <form onSubmit={HandleSubmit} className="mt-4 flex items-center gap-2">
                <input
                    type="text"
                    value={word}
                    onChange={word => setWord(word.target.value)}
                    placeholder="Insert your word here"
                    className="border rounded px-3 py-2"
                />
                <button type="submit"
                        className="px-3 py-2 rounded bg-blue-600 text-white disabled:opacity-50">
                    Submit
                </button>
            </form>
            <div>
                <span>{errorMessage}</span>
            </div>
        </div>
    )
}

export default GameForm;

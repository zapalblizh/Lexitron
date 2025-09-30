import {UseGame} from "./App.jsx";

function GameForm() {

    const { VerifyInput, UpdateDisplayGrid, ResetSelection, start, end, gameStart } = UseGame();

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

    const { word, setWord } = UseGame();

    return (
        <div className={ gameStart ? 'block' : 'hidden' }>
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
        </div>
    )
}

export default GameForm;

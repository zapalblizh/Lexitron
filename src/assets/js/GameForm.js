import UseGame from "./GameContext.jsx";
import VerifyWordPosition from "./functions/VerifyWordPosition.jsx"
import ResetGameState from "./functions/ResetGameState.jsx";

function GameForm() {
    const game = UseGame();

    // Handles Submission of a Word from Form
    function HandleSubmit(e) {
        e.preventDefault();

        const uppercaseWord = game.currentWord.word.toUpperCase();

        // Returns alerts and true when passes through all checks
        const isValid = VerifyWordPosition();

        if (isValid && game.wordDict.has(uppercaseWord)) {

            const currentTurn = {
                turn: game.turns.length + 1,
                player: game.currentPlayer,
                selection: {
                    direction: '',
                    indices: [],
                    constant: null,
                },
                word: game.currentWord.word,
                wordScore: 0
            }

            /*
            const [currentWord, setCurrentWord] = useState({
                player: {},
                selection: {
                    direction: '',
                    indices: [],
                    constant: null,
                },
                word: "",
                wordScore: 0
            });
            */

            // Constants for grid update
            currentTurn.selection.direction = game.gameState.start.row === game.gameState.end.row ? "horizontal" : "vertical";
            currentTurn.selection.constant = currentTurn.selection.direction === "horizontal" ? game.gameState.start.row : game.gameState.start.col;

            const axis = direction === "horizontal" ? start[0] : start[1];
            const wordStart = direction === "horizontal" ? Math.min(start[1], end[1]) : Math.min(start[0], end[0]);
            // console.log(direction, axis, wordStart, word);

            const indexList = Array.from({ length: word.length }, (_, i) => wordStart + i)
            UpdateDisplayGrid({
                direction: direction,
                constant: axis,
                indices: indexList,
                word: uppercaseWord
            });

            // return array with all words found with corresponding scores
            // [{
            //   word: 'WORD',
            //   score: 100,
            // }]
            const scoreWordsArray = ScoreWord()

            // TODO: Update players[0] to currentPlayer
            // Player, Score, Direction, Indexes, Constant
            setCurrentWord([players[0], scoreWordsArray, direction, indexList, axis]);
        }
        else {
            if (!wordList.has(uppercaseWord)) {
                setErrorMessage('Please enter a word that is included in the English dictionary.')
            }

            ResetGameState();
        }
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <form onSubmit={HandleSubmit} className="mt-4 flex items-center gap-2">
                <input
                    type="text"
                    value={currentWord.word}
                    onChange={word => setCurrentWord({
                        ...currentWord,
                        word: word.target.value
                    })}
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

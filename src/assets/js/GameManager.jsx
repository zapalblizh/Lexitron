import { createContext, useContext, useState } from 'react';
import multipliers from "../_data/multipliers.js";
import Form from "./Form.jsx";
import Board from "./Board.jsx";

const SIZE_OF_GRID = 15;

const GameContext = createContext();

export function UseGame() {
    return useContext(GameContext);
}

export function GameManager() {
    // 2D board State
    const [board, setBoard] = useState(() => {
        const initialBoard = Array.from({ length: SIZE_OF_GRID }, () =>
            Array.from({ length: SIZE_OF_GRID }, () => ({
                letter: '',
                bonus: null,
            }))
        );

        for (let i = 0; i < multipliers.length; i++) {
            initialBoard[multipliers[i][0]][multipliers[i][1]].bonus = multipliers[i][2];
        }

        return initialBoard;
    });

    /* Board and word states */
    // States for selecting starting and ending tiles
    const [startSelected, setStartSelected] = useState(false);
    const [endSelected, setEndSelected] = useState(false);
    // States for coordinates of start and end of word
    const [start, setStart] = useState([]); // [row, col]
    const [end, setEnd] = useState([]); // [row, col]
    // Word from from input state
    const [word, setWord] = useState('');

    /* Form States */
    const [gameStart, setGameStart] = useState(false);
    const [playerCount, setPlayerCount] = useState(2);

    // Resets all States
    function ResetSelection() {
        setStartSelected(false);
        setEndSelected(false);
        setStart([]);
        setEnd([]);
        setWord('');
    }

    function UpdateForm(e) {
        e.preventDefault();
        setGameStart(true);
    }

    function UpdatePlayerCount(e) {
        setPlayerCount(e.target.value);
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
                    next[indices[i]][constant].letter = letters[i];

                }
            }
            else if (direction === "horizontal") {
                for (let i = 0; i < limit; i++) {
                    next[constant][indices[i]].letter = letters[i];
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

    // 3. The value object contains everything you want to make "global"
    const value = {
        board,
        HandleSubmit,
        UpdateState,
        UseGame,
        SIZE_OF_GRID,
        start,
        end,
        word,
        setWord,
        gameStart,
        setGameStart,
        UpdateForm,
        playerCount,
        UpdatePlayerCount,
        setPlayerCount
    };

    return (
        <GameContext.Provider value={value}>
            <Board />
            <Form />
        </GameContext.Provider>
    );
}

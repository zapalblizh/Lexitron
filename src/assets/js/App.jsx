import {createContext, useContext, useEffect, useState} from "react";
import Board from "./Board.jsx";
import Form from "./Form.jsx";
import multipliers from "../_data/multipliers.js";
import {nanoid} from "nanoid";

const GameContext = createContext();

export function UseGame() {
    return useContext(GameContext);
}

function App() {
    const SIZE_OF_GRID = 15;
    const INITIAL_PLAYER_COUNT = 2;

    const player = {
        id: '',
        name: '',
        score: 0,
        words: [],
    }

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

    const [startSelected, setStartSelected] = useState(false);
    const [endSelected, setEndSelected] = useState(false);
    const [start, setStart] = useState([]); // [row, col]
    const [end, setEnd] = useState([]); // [row, col]
    const [word, setWord] = useState('');

    const [playerCount, setPlayerCount] = useState(INITIAL_PLAYER_COUNT);
    const [gameStart, setGameStart] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [wordList, setWordList] = useState(new Set());

    // Word, Player, Score, Direction, Indexes, Constant
    const [currentWord, setCurrentWord] = useState(["", "", 0, "", [], 0]);

    useEffect(() => {
        fetch('../../../twl.txt')
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
            .then((text) => {
                const words = text.replace(/\r/g, '').split('\n');
                setWordList(new Set(words));
            })
            .catch(error => {
                console.error("Failed to load word list:", error);
                setErrorMessage("Could not load word list. Please try again later.");
            });
    }, []);

    let minPlayers = [];

    for (let i = 0; i < playerCount; i++) {
        const newPlayer = {
            name: `Player ${i + 1}`,
            id: nanoid(),
            score: 0,
            words: []
        };

        minPlayers = [...minPlayers, newPlayer];
    }

    const [players, setPlayers] = useState(minPlayers);
    const [currentPlayer, setCurrentPlayer] = useState(0);

    // Resets Selection
    function ResetSelection() {
        setStartSelected(false);
        setEndSelected(false);
        setStart([]);
        setEnd([]);
        setWord('');
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

    const value = {
        startSelected, setStartSelected,
        endSelected, setEndSelected,
        start, setStart,
        end, setEnd,
        word, setWord,
        board, setBoard,
        SIZE_OF_GRID,
        player,
        playerCount, setPlayerCount,
        gameStart, setGameStart,
        players, setPlayers,
        ResetSelection,
        UpdateDisplayGrid,
        errorMessage, setErrorMessage,
        wordList,
        currentWord, setCurrentWord,

    }

    return (
        <div>
            <GameContext.Provider value={value}>
                <Board />
                <Form />
            </GameContext.Provider>
        </div>
    )
}

export default App;

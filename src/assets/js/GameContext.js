import { createContext, useContext, useState, useEffect } from "react";
import {nanoid} from "nanoid";
import multipliers from "../_data/multipliers.js";

// 1. Create context
const GameContext = createContext(null);

// 2. Create provider component
export function GameProvider({ children }) {
    const INITIAL_PLAYER_COUNT = 2;
    const SIZE_OF_GRID = 15;

    const [turns, setTurn] = useState([]);
    const [playerCount, setPlayerCount] = useState(INITIAL_PLAYER_COUNT);
    const [wordDict, setWordDict] = useState(new Set());

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

    // Creates array with two players and inserts it as initial state
    let  minPlayers = [];
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

    // Dictionary of Words
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
                setWordDict(new Set(words));
            })
            .catch(error => {
                console.error("Failed to load word list:", error);
            });
    }, []);

    const value = { turns, setTurn, playerCount, setPlayerCount, players, setPlayers, wordDict, board, setBoard, SIZE_OF_GRID };

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function UseGame() {
    return useContext(GameContext);
}

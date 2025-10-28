import { useState } from "react";
import Board from "./components/Board.js";
import Form from "./Form.js";

export default function App() {
    const [gameState, setGameState] = useState({
        start: {
            status: false,
            direction: '',
            row: 0,
            col: 0
        },
        end: {
            status: false,
            direction: '',
            row: 0,
            col: 0
        }
    });

    const [currentWord, setCurrentWord] = useState({
        player: {},
        selection: {},
        word: "",
        wordScore: 0
    });

    return (
        <div>
            <Board gameState={gameState} setGameState={setGameState} currentWord={currentWord} setCurrentWord={setCurrentWord} />
            <Form gameState={gameState} setGameState={setGameState} currentWord={currentWord} setCurrentWord={setCurrentWord} />
        </div>
    )
}

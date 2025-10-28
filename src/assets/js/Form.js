import StartForm from "./StartForm.js";
import GameForm from "./GameForm.js";
import {useState} from "react";

function Form() {
    const [gameStart, setGameStart] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [currentPlayer, setCurrentPlayer] = useState(player);

    return (
        <div>
            <StartForm />
            <GameForm />
        </div>
    )
}

export default Form;

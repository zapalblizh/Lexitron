import {Board} from "./components/Board.jsx";
import {StartForm} from "./components/StartForm.jsx";
// import GameForm from "./GameForm.js";

import {GameProvider, GameContext} from "./GameContext.jsx";
import {useContext} from "react";

function App() {

    return (
        <div>
            <GameProvider>
                <Board />
                <StartForm />
            </GameProvider>
        </div>
    )
}

/*
* {
* // Add Component to deal with errors
                !game.gameStart ? <StartForm />
                    : <GameForm />
            }
           <StartForm />


                <div className="flex items-center justify-center p-4 text-red-400">
                    <span>{errorMessage}</span>
                </div>
* */

export default App;
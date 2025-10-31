import {Board} from "./components/Board.jsx";
import {StartForm} from "./components/StartForm.jsx";
import GameForm from "./components/GameForm.jsx";

import {GameProvider, GameContext} from "./GameContext.jsx";
import {useContext} from "react";
import {ErrorComponent} from "./components/ErrorComponent.jsx";

function App() {
    const {gameStart} = useContext(GameContext);

    return (
        <div>
            <GameProvider>
                <Board />
                {gameStart ? <GameForm /> : <StartForm />}
                <ErrorComponent />
            </GameProvider>
        </div>
    )
}

export default App;
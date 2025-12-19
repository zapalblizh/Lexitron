import {Board} from "./components/Board.jsx";
import {StartForm} from "./components/StartForm.jsx";
import GameForm from "./components/GameForm.jsx";

import {GameContext} from "./GameContext.jsx";
import {useContext} from "react";
import {ErrorComponent} from "./components/ErrorComponent.jsx";

function App() {
    const {gameStart} = useContext(GameContext);

    return (
        <div className="w-full flex flex-col items-center gap-4">
            <Board />
            {gameStart ? <GameForm /> : <StartForm />}
            <ErrorComponent />
        </div>
    )
}

export default App;
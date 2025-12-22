import {Board} from "./components/Board.jsx";
import {StartForm} from "./components/StartForm.jsx";
import GameForm from "./components/GameForm.jsx";

import {GameContext} from "./GameContext.jsx";
import {useContext} from "react";
import {ErrorComponent} from "./components/ErrorComponent.jsx";
import {TurnsHistory} from "./components/TurnsHistory.jsx";
// import {Leaderboard} from "./components/Leaderboard.jsx";

function App() {
    const {gameStart} = useContext(GameContext);

    return (
        <div className="">
            <div className="w-full grid grid-span-1 lg:grid-cols-6 gap-x-4">
                <div className="col-span-1 lg:col-span-4">
                    <Board />

                    {/*<Leaderboard/>*/}
                </div>

                <div className="flex flex-col justify-center lg:justify-start gap-4 py-8 col-span-1 lg:col-span-2">
                    {gameStart ? <GameForm /> : <StartForm />}

                    <TurnsHistory />
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default App;
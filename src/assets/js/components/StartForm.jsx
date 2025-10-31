import {PlayerTile} from "./PlayerTile.jsx";
import {useContext} from "react";
import {GameContext} from "../GameContext.jsx";

export const StartForm = () => {
    const {players, setGameStart} = useContext(GameContext);

    return (
        <div>
            <form className="flex flex-col items-center gap-4 p-4 w-full" onSubmit={(event) => {
                event.preventDefault();
                setGameStart(true);
            }}>
                <div className="flex flex-col justify-start gap-2 w-full text-start max-w-xs">
                    <span className="text-2xl font-bold">Players</span>

                    <div className="flex flex-col border-2 border-black divide-y-2 divide-black">
                        {players.map((player) => (
                            <PlayerTile key={player.id} Player={player} />
                        ))}
                    </div>
                </div>

                <button type="submit" className={"px-3 py-2 rounded bg-red-500 text-black"}>
                    START GAME
                </button>
            </form>
        </div>
    )
}

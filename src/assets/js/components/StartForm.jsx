import {PlayerTile} from "./PlayerTile.jsx";
import {useContext} from "react";
import {GameContext} from "../GameContext.jsx";
import {nanoid} from "nanoid";

export const StartForm = () => {
    const {players, setGameStart, setErrorMessage, setPlayers} = useContext(GameContext);

    const AddPlayer = () => {
        if (players.length === 4) {
            setErrorMessage('Maximum of 4 players allowed only');
        }
        else {
            const newPlayer = {
                name: `Player ${players.length + 1}`,
                id: nanoid(),
                currentPlayer: false,
                score: 0,
                turns: []
            };

            setPlayers(prev => {
                return [...prev, newPlayer];
            });
        }
    }

    return (
        <div className="flex flex-col justify-center w-full mx-auto max-w-sm px-4">
            <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">Players</span>
                <button type="button" onClick={() => AddPlayer()} className="btn btn--xs">ADD</button>
            </div>

            <form className="flex flex-col items-center gap-4 p-2 sm:p-4 w-full" onSubmit={(event) => {
                event.preventDefault();
                setGameStart(true);
            }}>
                <div className="w-full mx-auto flex flex-col justify-center items-center gap-4 p-2 bg-cursor border-skin-600 border-2 rounded-xl">

                    {players.map((player) => (
                        <PlayerTile key={player.id} Player={player} />
                    ))}

                    <button type="submit" className="btn btn--primary">
                        START GAME
                    </button>
                </div>
            </form>
        </div>
    )
}

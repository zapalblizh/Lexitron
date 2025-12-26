import {PlayerTile} from "./PlayerTile.jsx";
import {useContext} from "react";
import {GameContext} from "../GameContext.jsx";
import {nanoid} from "nanoid";
import {ErrorComponent} from "./ErrorComponent.jsx";

export const StartForm = () => {
    const {players, setGameStart, errorMessage, setErrorMessage, setPlayers} = useContext(GameContext);

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
        <div className="flex flex-col justify-center w-full gap-2">
            <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">Players</span>
                <button type="button" onClick={() => AddPlayer()} className="btn btn--xs">Add</button>
            </div>

            <form className="max-w-96 flex flex-col items-center gap-4 px-6 py-3 w-full mx-auto justify-center bg-cursor border-2 border-ink rounded-xl" onSubmit={(event) => {
                event.preventDefault();
                setGameStart(true);
            }}>
                {players.map((player) => (
                    <PlayerTile key={player.id} Player={player} />
                ))}

                <div className={errorMessage ? "block" : "hidden"}>
                    <ErrorComponent />
                </div>

                <button type="submit" className="btn-submit">
                    Start Game
                </button>
            </form>
        </div>
    )
}

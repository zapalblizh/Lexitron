import {GameContext} from "../GameContext.jsx";
import {useContext} from "react";

export const PlayerTile = ({Player}) => {
    const {players, setPlayers, setErrorMessage} = useContext(GameContext);

    const HandleNameChange = ({Player, name}) => {
        setPlayers(
            players.map(p => (
                p.id === Player.id ? { ...p, name: name } : p)
            )
        );
    }

    const RemovePlayer = (Player) => {
        setPlayers(
            players.filter(player => player.id !== Player.id)
        )
    }

    return (
        <div key={Player.id} className="w-full">
            <div className="flex w-full items-center gap-4">
                <input
                    type="text"
                    value={Player.name}
                    onChange={(e) => HandleNameChange({ Player, name: e.target.value })}
                    className="border rounded px-2 py-1 w-full min-w-0"
                    placeholder={`Your Player Name`}
                />

                <button
                    type="button"
                    disabled={players.length === 2}
                    onClick={() => RemovePlayer(Player)}
                    className="btn btn--xs whitespace-nowrap flex-shrink-0">
                    DELETE
                </button>
            </div>
        </div>
    )
}

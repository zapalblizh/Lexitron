import {useContext} from "react";
import {GameContext} from "../GameContext.jsx";

export const PlayerSelector = () => {
    const {players, setPlayers} = useContext(GameContext);

    const handlePlayerSelect = (id) => {
        setPlayers(prevPlayers => {

            return prevPlayers.map(player => {
                return {...player, currentPlayer: (player.id === id) ? !player.currentPlayer : false};
            })
        })
    }

    return (
        players.map(player => (
            <button key={player.id}
                    onClick={() => handlePlayerSelect(player.id)}
                    disabled={player.currentPlayer}
                    className="rounded px-4 py-2 bg-green-500 disabled:bg-green-300 text-[#001A0A]">
                <span>{player.name}</span>
            </button>
        ))
    )
}
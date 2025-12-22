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
        <div className="flex flex-wrap justify-center gap-2 px-8">
            {players.map(player => (
                <button key={player.id}
                        onClick={() => handlePlayerSelect(player.id)}
                        disabled={player.currentPlayer}
                        className="btn btn--primary">
                    <span>{player.name}</span>
                </button>
            ))}
        </div>
    )
}
import {useContext} from "react";
import {GameContext} from "../GameContext.jsx";

const getTurnData = (turn, players) => {
    const turnId = turn.turnId;
    const playerName = players.find(player => player.id === turn.playerId)?.name;
    // const words = [turn.word, ...(turn.bonusWords || [])].join(", ");
    const score = turn.wordScore

    return {
        turnId,
        playerName,
        // words,
        score,
    };
}

export const TurnsHistory = () => {
    const {turns, players} = useContext(GameContext);

    return (
        <div className="flex-1 p-4 bg-skin-600/60 rounded-sm">
            <div className="flex flex-col gap-2">
                {turns.map((turn) => {
                    const turnData = getTurnData(turn, players);

                    return (
                        <div key={turnData.turnId} className="grid grid-cols-4 gap-2 p-2">
                            <span>{turnData.turnId}</span>
                            <span className="text-xl font-bold">{turnData.playerName}</span>
                            {/*<span className="text-lg">{turnData.words}</span>*/}
                            <span className="text-lg">{turnData.score}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
import {GameContext} from "../GameContext.jsx";
import {useContext} from "react";
import {nanoid} from "nanoid";

export const PlayerTile = ({Player}) => {
    const {players, setPlayers, setErrorMessage} = useContext(GameContext);

    const HandleNameChange = ({Player, name}) => {
        setPlayers(
            players.map(p => (
                p.id === Player.id ? { ...p, name: name } : p)
            )
        );
    }

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

            setPlayers([...players, newPlayer]);
        }
    }

    const RemovePlayer = (Player) => {
        setPlayers(
            players.filter(player => player.id !== Player.id)
        )
    }

    return (
        <div key={Player.id} className="flex items-center justify-between p-4 gap-4 bg-white">
            <input
                type="text"
                value={Player.name}
                onChange={current => HandleNameChange({Player, name: current.target.value})}
                className="border rounded px-3 py-2"
                placeholder={`Player ${players.length + 1}`}
            />

            <button disabled={players.length === 2} onClick={() => RemovePlayer(Player)} className={ players.length === 2 ? `text-gray-700` : `h-full text-2xl`}>
                <svg className="w-[24px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                    <rect width={256} height={256} fill="none" /><line x1={216} y1={56} x2={40} y2={56} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={12} />
                    <line x1={104} y1={104} x2={104} y2={168} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={12}/>
                    <line x1={152} y1={104} x2={152} y2={168} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={12}/>
                    <path d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={12}/>
                    <path d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={12}/>
                </svg>
            </button>

            <button onClick={AddPlayer} className="text-[24px] font-bold">+</button>
        </div>
    )
}

import { UseGame } from "./GameContext.js";
import { nanoid } from "nanoid";

export default function StartForm() {

    const { playerCount, players, setPlayers, setPlayerCount, gameStart, setGameStart} = UseGame();

    function UpdateForm(props) {
        props.preventDefault();
        setGameStart(true);
    }

    function AddPlayer() {
        if (playerCount === 4) {
            alert('Maximum of 4 players allowed only');
            return '';
        }
        else {
            setPlayerCount(playerCount + 1);
            const newPlayer = {
                name: `Player ${playerCount + 1}`,
                id: nanoid(),
                score: 0,
                words: []
            };

            setPlayers([...players, newPlayer]);
        }
    }

    function HandleNameChange(id, name) {
        setPlayers(
            players.map(p => (
                p.id === id ? { ...p, name: name } : p)
            )
        );
    }

    function RemovePlayer(id) {
        setPlayerCount(playerCount - 1);
        setPlayers(previousPlayers => {
            return previousPlayers.filter(player => player.id !== id);
        });
    }

    return (
        <div className={gameStart ? 'hidden' : 'block'}>
            <form className="flex flex-col items-center gap-4 p-4 w-full" onSubmit={UpdateForm}>
                <div className="flex flex-col justify-start gap-2 w-full text-start max-w-xs">
                    <span className="text-2xl font-bold">Players</span>
                    <div className="flex flex-col border-2 border-black divide-y-2 divide-black">
                        {players.map((player, i) => (
                            <div key={player.id} className="flex items-center justify-between p-4 gap-4 bg-white">
                                <input
                                    type="text"
                                    value={player.name}
                                    onChange={current => HandleNameChange(player.id, current.target.value)}
                                    className="border rounded px-3 py-2"
                                    placeholder={`Player ${i + 1}`}
                                />

                                <button disabled={playerCount === 2} onClick={() => RemovePlayer(player.id)} className="h-full text-2xl">
                                    <svg className="w-[24px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                                        <rect width={256} height={256} fill="none" /><line x1={216} y1={56} x2={40} y2={56} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={12} />
                                        <line x1={104} y1={104} x2={104} y2={168} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={12}/>
                                        <line x1={152} y1={104} x2={152} y2={168} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={12}/>
                                        <path d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={12}/>
                                        <path d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={12}/>
                                    </svg>
                                </button>

                                <button onClick={() => AddPlayer() } className="text-[24px] font-bold">+</button>
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit" onClick={() => setGameStart(true)} className={"px-3 py-2 rounded bg-red-500 text-black"}>
                    START GAME
                </button>
            </form>
        </div>
    )
}

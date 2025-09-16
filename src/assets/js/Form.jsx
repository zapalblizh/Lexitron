import { UseGame } from "./GameManager.jsx";

export default function Form() {
    const { HandleSubmit, word, setWord, gameStart, UpdateForm, playerCount, setPlayerCount } = UseGame();

    if (!gameStart) {
        return (
            <form onSubmit={UpdateForm}>
                <input type="range" min={2} max={4} step={1} value={playerCount} onChange={(playerCount) => setPlayerCount(playerCount.target.value)}/>
                <button type="submit" className={"px-3 py-2 rounded bg-red-500 text-black"}>
                    START GAME
                </button>
            </form>
        )
    }
    else {
        return (
            <>

                <form onSubmit={HandleSubmit} className="mt-4 flex items-center gap-2">
                    <input
                        type="text"
                        value={word}
                        onChange={word => setWord(word.target.value)}
                        placeholder="Insert your word here"
                        className="border rounded px-3 py-2"
                    />
                    <button type="submit"
                            className="px-3 py-2 rounded bg-blue-600 text-white disabled:opacity-50">
                        Submit
                    </button>
                </form>
            </>
        )
    }
}

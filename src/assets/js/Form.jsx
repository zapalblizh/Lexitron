import { UseGame } from "./GameManager.jsx";

export default function Form() {

    const { HandleSubmit, word, setWord } = UseGame();

    return (
        <>
            <form onSubmit={HandleSubmit} className="mt-4 flex items-center gap-2">
                <input
                    type="text"
                    onChange={word => setWord(word.target.value)}
                    placeholder="Word (optional)"
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
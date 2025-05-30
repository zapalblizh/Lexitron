import '../css/main.css'

function Tile(
    {
        bonus = "",
        row = null,
        col = null,
        letter = "",
        selected = "",
        update = null
    }
) {

    return (
        <>
            <div className={`tile ${bonus} ${selected}`}>
                <button className="w-full h-full" onClick={update}>
                    {letter}
                </button>
            </div>
        </>
    )
}

export default Tile

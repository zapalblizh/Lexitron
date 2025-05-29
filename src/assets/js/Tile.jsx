import '../css/main.css'

function Tile({ bonus = ""}) {

    return (
        <>
            <div className={`tile ${bonus}`}>
                <button className="" >A</button>
            </div>
        </>
    )
}

export default Tile

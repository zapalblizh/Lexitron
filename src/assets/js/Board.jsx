import '../css/main.css'
import Tile from "./Tile.jsx";
import multipliers from "../_data/multipliers.js";

function Board() {

  let grid = Array.from(
      {length: 15}, () => Array(15).fill(null)
  );

  const typesMulti = ["lx2", "lx3", "wx2", "wx3"];

  let i = 0;
  for (let multi in multipliers) {
    ApplyMultipliers(multipliers[multi], typesMulti[i], grid);

    i++;
  }

  grid[7][7] = <Tile bonus="center" />;

  // Fill remaining null cells with normal tiles
  grid = grid.map((row) =>
      row.map((cell) => cell === null ? <Tile /> : cell)
  );

  return (
      <>
        <div className="grid inline-grid grid-cols-15 border border-2">
          {grid}
        </div>
      </>
  );
}

function ApplyMultipliers(obj, value, grid) {
  for (let row in obj) {
    for (let col of obj[row]) {
      grid[row][col] = <Tile bonus={value} />;
    }
  }
}
export default Board;
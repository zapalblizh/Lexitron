import '../css/main.css'
import { useState } from "react";
import Tile from "./Tile.jsx";
import multipliers from "../_data/multipliers.js";

function Board() {
  const [startSelected, setStartSelected] = useState(false);
  const [endSelected, setEndSelected] = useState(false);
  let [positionsOfSelected, setPosSelected] = useState([]);

  // Creates Initial Grid for Scrabble Game (15x15 with bonuses)
  const [grid, setGrid] = useState(() => {
    return Array.from({ length: 15 }, (_, row) =>
        Array.from({ length: 15 }, (_, col) => {
          let bonus = "";

          if (row === 7 && col === 7) {
            bonus = "center";
          }
          else {
            for (let i = 0; i < Object.keys(multipliers).length; i++) {
              const obj = multipliers[Object.keys(multipliers)[i]];

              if (obj[row] && obj[row].includes(col)) {
                bonus = ["lx2", "lx3", "wx2", "wx3"][i];
                break;
              }
            }
          }

          return {
            bonus,
            letter: "",
            row,
            col,
            selected: "",
          };
        })
    );
  });

  const checkState = () => {
    if (!startSelected) {
      setStartSelected(true);
      return "select-start border-4 border-green-500"
    }
    else if (!endSelected) {
      setEndSelected(true);
      return "select-end border-4 border-red-500"
    }
    else {
      setStartSelected(false);
      setEndSelected(false);
      return  ""
    }
  }

  const updateGrid = (row, col) => {
    setGrid(prevGrid => {
      let updated = prevGrid.map(row => row.map(col => ({ ...col })));

      let chosenSelection = checkState();
      // If we're clearing selection
      if (chosenSelection === "") {
        setPosSelected([]);

        return updated.map(row =>
            row.map(col => (col.selected !== "" ? { ...col, selected: "" } : col))
        );
      }

      if (
          !updated[row][col].selected.includes("select-start") &&
          !updated[row][col].selected.includes("select-end")
      ) {
        updated[row][col].selected = chosenSelection;

        setPosSelected(prevPositions => [...prevPositions, { row: row, col: col }]);
      }

      return updated;
    });
  };

  return (
      <div className="grid inline-grid grid-cols-15 border border-1">
        {grid.flat().map(({ row, col, bonus, letter, selected }) => (
            <Tile
                key={`${row}-${col}`}
                row={row}
                col={col}
                bonus={bonus}
                letter={letter}
                selected={selected}
                temp={positionsOfSelected}
                update={() => updateGrid(row, col)}
            />
        ))}
      </div>
  );
}

export default Board;
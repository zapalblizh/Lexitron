// import { useState } from "react";
import multipliers from "../_data/multipliers.js";

const SIZE_OF_GRID = 15;

export default function Board() {
  /*
  const [startSelected, setStartSelected] = useState(false);
  const [endSelected, setEndSelected] = useState(false);
  let [positionsOfSelected, setPosSelected] = useState([]);
  */

  /*
  const checkState = () => {
    if (!startSelected) {
      setStartSelected(true);
      return "select-start border-2 md:border-4 border-green-500"
    }
    else if (!endSelected) {
      setEndSelected(true);
      return "select-end border-2 md:border-4 border-red-500"
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
  */

  return (
      <div className="grid border" style={{ gridTemplateColumns: `repeat(${SIZE_OF_GRID}, 1fr)`,}}>

        {(() => {
          let tiles = [];
          let id = 0;

          for (let row = 0; row < SIZE_OF_GRID; row++) {
            for (let col = 0; col < SIZE_OF_GRID; col++) {
              let bonus = multipliers.find(([r, c]) => r === row && c === col)?.[2] ?? '';

              tiles.push(
                  <div key={id} data-selectedfirst={true} data-selectedlast={true} data-row={row} data-col={col} className={`tile ${bonus}`}>
                    <button className="w-full h-full">
                      <span className={'tile-text'}></span>
                    </button>
                  </div>
              );

              id++;
            }
          }

          return tiles;
        })()}
      </div>
  );
}

// import { useState } from "react";
import multipliers from "../_data/multipliers.js";
import {use, useState} from "react";

const SIZE_OF_GRID = 15;

export default function Board() {

    const [startSelected, setStartSelected] = useState(false);
    const [endSelected, setEndSelected] = useState(false);
    const [start, setStart] = useState({});
    const [end, setEnd] = useState({});

    const updateState = (row, col) => {
        if (!startSelected) {
            setStartSelected(true);
            setStart({ row, col });
        }
        else if (start.row === row && start.col === col) {
            setStartSelected(false);
            setStart({});
        }
        else if (!endSelected) {
            setEndSelected(true);
            setEnd({ row, col });
        }
        else if (end.row === row && end.col === col) {
            setEndSelected(false);
            setEnd({});
        }
        else {
            setStartSelected(false);
            setEndSelected(false);
            setStart({});
            setEnd({});
        }
    }

    return (
        <div className="grid border" style={{gridTemplateColumns: `repeat(${SIZE_OF_GRID}, 1fr)`,}}>

            {(() => {
                let tiles = [];
                let id = 0;

                for (let row = 0; row < SIZE_OF_GRID; row++) {
                    for (let col = 0; col < SIZE_OF_GRID; col++) {
                        let bonus = multipliers.find(([r, c]) => r === row && c === col)?.[2] ?? '';

                        let isStart = start.row === row && start.col === col;
                        let isEnd = end.row === row && end.col === col;

                        const selectedClass = isStart ? "select-start border-2 md:border-4 border-green-500"
                            : isEnd ? "select-end border-2 md:border-4 border-red-500"
                            : "";

                        tiles.push(
                            <div onClick={() => updateState(row, col)} key={id} data-row={row} data-col={col}
                                 className={`tile ${bonus} ${selectedClass}`}>
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

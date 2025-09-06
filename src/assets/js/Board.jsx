// import { useState } from "react";
import multipliers from "../_data/multipliers.js";
import {use, useState} from "react";

const SIZE_OF_GRID = 15;

export default function Board() {

    const [startSelected, setStartSelected] = useState(false);
    const [endSelected, setEndSelected] = useState(false);
    const [start, setStart] = useState([]);
    const [end, setEnd] = useState([]);
    const [word, setWord] = useState('');

    function ResetSelection() {
        setStartSelected(false);
        setEndSelected(false);
        setStart({});
        setEnd({});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let constantAxis = 0;
        let changingAxis = [];

        const emptyStatus = Object.keys(start).length === 0 || Object.keys(end).length === 0;

        if (emptyStatus) {
            ResetSelection();
            return alert('Please select start and end of your word horizontally or vertically.');
        }

        console.log(start);
        console.log(end);

        if (start[0] === end[0]) {
            constantAxis = start[0];

            console.log('First Condition');

            const changingStart = start[1] > end[1] ? end[1] : start[1];
            let length = start[1] > end[1] ? start[1] : end[1];
            length = length - changingStart + 1;

            let changingAxis = Array.from({ length  }, (_, i) => changingStart + i);

            console.log(changingAxis);
        }
        else if (start[1] === end[1]) {
            constantAxis = start[1];

            console.log('Second Condition');

            const changingStart = start[0] > end[0] ? end[0] : start[0];
            let length = start[0] > end[0] ? start[0] : end[0];
            length = length - changingStart + 1;

            let changingAxis = Array.from({ length }, (_, i) => changingStart + i);

            console.log(changingAxis);
        }
        else {
            ResetSelection();
            console.log('Third Condition');
            return alert('Please select start and end of your word horizontally or vertically.');
        }

        for (let item in changingAxis) {
            console.log(item.toString() + constantAxis.toString())
        }

        setWord(word);
        console.log(word);
    }

    function getAllTiles() {

    }
    function calculateWordScore(word) {

    }

    const updateState = (row, col) => {
        if (!startSelected) {
            setStartSelected(true);
            setStart([row, col]);
        }
        else if (start[0] === row && start[1] === col) {
            setStartSelected(false);
            setStart([]);
        }
        else if (!endSelected) {
            setEndSelected(true);
            setEnd([row, col]);
        }
        else if (end[0] === row && end[1] === col) {
            setEndSelected(false);
            setEnd([]);
        }
        else {
            ResetSelection();
        }
    }

    return (
        <>
            <div className="grid border" style={{gridTemplateColumns: `repeat(${SIZE_OF_GRID}, 1fr)`,}}>

                {(() => {
                    let tiles = [];
                    let id = 0;

                    for (let row = 0; row < SIZE_OF_GRID; row++) {
                        for (let col = 0; col < SIZE_OF_GRID; col++) {
                            let bonus = multipliers.find(([r, c]) => r === row && c === col)?.[2] ?? '';

                            let isStart = start[0] === row && start[1] === col;
                            let isEnd = end[0] === row && end[1] === col;

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

            <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
                <input
                    type="text"
                    value={word}
                    onChange={word => setWord(word.target.value)}
                    placeholder="Word (optional)"
                    className="border rounded px-3 py-2"
                />
                <button
                    type="submit"
                    className="px-3 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
                >
                    Submit
                </button>
            </form>
        </>
    );
}

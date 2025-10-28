export function UpdateGrid({ board, setBoard, gameState, currentWord }) {
    const letters = currentWord.word.toUpperCase().split("");
    if (letters.length === 0) return;

    const next = board.map(row => row.slice());

    currentWord.selection.indices.forEach(i => {
        const limit = Math.min(currentWord.selection.indices[i].length, letters.length);

        if (gameState.start.direction === "vertical") {
            for (let i = 0; i < limit; i++) {
                next[currentWord.selection.indices[i]][currentWord.selection.constant].letter = letters[i];
            }
        }
        else if (gameState.start.direction === "horizontal") {
            for (let i = 0; i < limit; i++) {
                next[currentWord.selection.constant][currentWord.selection.indices[i]].letter = letters[i];
            }
        }
    });

    setBoard(next);
}

export function ResetGameState({setGameState, setCurrentWord, setGameStart, setCurrentPlayer}) {
    setGameState({
        start: {
            status: false,
            direction: '',
            row: 0,
            col: 0
        },
        end: {
            status: false,
            direction: '',
            row: 0,
            col: 0
        }
    });

    setCurrentWord({
        player: {},
        selection: {},
        word: "",
        wordScore: 0
    });

    setGameStart(false);
    setCurrentPlayer({});
}

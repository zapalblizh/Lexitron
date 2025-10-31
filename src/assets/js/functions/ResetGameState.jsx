import {useContext} from "react";
import {GameContext} from "../GameContext.jsx";

export const ResetGameState = () => {
    const {setGameState, setCurrentWord, setGameStart, setCurrentPlayer} = useContext(GameContext);

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

import {useContext} from "react";
import {GameContext} from "../GameContext.jsx";

export const ResetGameState = () => {
    const {setGameState, setCurrentWord} = useContext(GameContext);

    setGameState({
        start: {
            status: false,
            row: null,
            col: null
        },
        end: {
            status: false,
            row: null,
            col: null
        }
    });

    setCurrentWord("");
}

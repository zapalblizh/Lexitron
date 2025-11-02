import {useContext} from "react";
import {GameContext} from "../GameContext.jsx";

export const useSeekWordsCreated = (selection) => {
    const {board} = useContext(GameContext);

    return [];
}
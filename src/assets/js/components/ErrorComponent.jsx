import {GameContext} from "../GameContext.jsx";
import {useContext} from "react";

export const ErrorComponent = () => {
    const {errorMessage} = useContext(GameContext);

    return (
        <div className="flex items-center justify-center p-4 text-red-400">
            <span>{errorMessage}</span>
        </div>
    )
}
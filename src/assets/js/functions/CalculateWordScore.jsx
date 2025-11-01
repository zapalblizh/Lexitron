import { useContext } from "react";
import { GameContext } from "../GameContext.jsx";
import points from "../../_data/game.js";

export const CalculateWordScore = (boardBonuses) => {

    const {currentWord} = useContext(GameContext);

    const letterArr = currentWord.toUpperCase().split("");

    let score = 0;

    // Counts word score
    for (let i = 0; i < letterArr.length; i++) {
        for (const [key, value] of Object.entries(points) ) {
            if (value.includes(letterArr[i]) && boardBonuses[i].slice(0, 2) === 'lx') {
                score = score + (key * boardBonuses[i].slice(2));
            }
        }
    }

    if (boardBonuses.some(bonus => bonus.slice(0, 2) !== 'wx')) {
        score = score * boardBonuses.filter(bonus => bonus.slice(0, 2) === 'wx').slice(2);
    }

    return score;
}

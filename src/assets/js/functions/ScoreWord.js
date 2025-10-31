function ScoreWord() {
    const wordLetterArray = word.toUpperCase().split("");
    let wordScore = 0;

    // Counts word score
    for (let i = 0; i < wordLetterArray.length; i++) {
        for (const [key, value] of Object.entries(scores['points']) ) {
            if (value.includes(wordLetterArray[i])) {
                wordScore = wordScore + key;
            }
        }
    }

    // Calculate bonuses for word


}

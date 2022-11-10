// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import text from "./resources/dictionary";
import realText from "./resources/realWords";

class WordList
{
    pick()
    {
        return realText[this.getRandomInt(realText.length)];
    }

    is_guessable(word: string)
    {
        return text.includes(word);
    }

    getRandomInt(max: number)
    {
        return Math.floor(Math.random() * max);
    }
}

export default WordList;
// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import realText from './resources/realWords';

class SuggestionBox
{
    //#region Non-Public Properties

    private _possibleWords: string[];

    //#endregion

    //#region Non-Public Methods

    private analyzeGuess (guess: string, colors: number[]): void
    {
        for (let k = this._possibleWords.length - 1; k > -1; k--)
        {
            let word: string = this._possibleWords[k];
            if (word !== undefined)
            {
                let containedChars: string = '';
                let isDeleted: boolean = false;

                for (let i = 0; i < 5; i++) 
                {
                    let char: number = guess.charCodeAt(i);
                    let wChar: number = word.charCodeAt(i);

                    if (colors[i] === 0)
                    {
                        containedChars += guess[i];
                        if (wChar === char || word.indexOf(guess[i]) === -1) 
                        {
                            isDeleted = true;
                            break;
                        }
                    }
                    else if (colors[i] === 1)
                    {
                        containedChars += guess[i];
                        if (wChar !== char) 
                        {
                            isDeleted = true;
                            break;
                        }
                    }
                }
                if (!isDeleted)
                {
                    for (let i = 0; i < 5; i++)
                    {
                        if (word.indexOf(guess[i]) !== -1 && containedChars.indexOf(guess[i]) === -1)
                        {
                            isDeleted = true;
                            break;
                        }
                    }
                }
                if (isDeleted)
                {
                    delete this._possibleWords[k];
                }
            }
        }
    }

    //#endregion

    //#region Public Interface

    public constructor()
    {
        this._possibleWords = [];
        this.reset();
    }

    public makeGuess (guess: string, colors: number[]): string[]
    {
        let suggestedWords: string[] = [];
        this.analyzeGuess(guess, colors);
        let count: number = 0;
        while (count < this._possibleWords.length && suggestedWords.length < 3)
        {

            let word: string = this._possibleWords[count];
            if (word !== undefined)
            {
                suggestedWords.push(this._possibleWords[count]);
            }
            count++;
        }
        return suggestedWords;
    }

    public reset (): void
    {
        this._possibleWords = [...realText];
        this._possibleWords = this._possibleWords.sort(() => Math.random() - 0.5);
    }

    //#endregion
}

export default SuggestionBox;
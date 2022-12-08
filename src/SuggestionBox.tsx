// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import realText from './resources/realWords';

class SuggestionBox
{
    //#region Non-Public Properties

    private _possibleWords: string[] = [];

    private readonly CHARS: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    private readonly RESPONSE: number[] = [-1, -1, -1, -1, -1]

    //#endregion

    //#region Non-Public Methods

    private analyzeGuess (guess: string, colors: number[]): void
    {
        for (let k = this._possibleWords.length - 1; k > -1; k--)
        {
            let word: string = this._possibleWords[k];
            if (word !== undefined && this.IsWordWrong(word, guess, colors))
            {
                delete this._possibleWords[k]
            }
        }
    }

    public IsWordWrong(word: string, guess: string, colors: number[]): boolean
    {
        let charAt = [...this.CHARS];
        for (let i = 0; i < 5; i++) 
        {
            charAt[word.charCodeAt(i) - 65]++;
        }

        let response = [...this.RESPONSE];
        if (word === guess)
        {
            return true;
        }
        for (let i = 0; i < 5; i++) 
        {
            if (word[i] === guess[i]) 
            {
                if(colors[i] !== 1)
                {
                    return true;
                }
                response[i] = 1;
                charAt[word.charCodeAt(i) - 65]--;
            }
            else if(colors[i] === 1)
            {
                return true;
            }
        }
        for (let i = 0; i < 5; i++)
        {
            let ch = guess.charCodeAt(i);
            if (charAt[ch - 65] > 0 && guess[i] !== word[i] && response[i] === -1)
            {
                response[i] = 0;
                charAt[ch - 65]--;
            }
            if(response[i] !== colors[i])
            {
                return true;
            }
        }
        return false;
    }

    //#endregion

    //#region Public Interface

    public constructor()
    {
        this.reset();
    }

    public makeGuess (guess: string, colors: number[]): string[]
    {
        this.analyzeGuess(guess, colors);

        let suggestedWords: string[] = [];
        for (let i = 0; i < this._possibleWords.length && suggestedWords.length < 3; i++)
        {
            if (this._possibleWords[i] !== undefined)
            {
                suggestedWords.push(this._possibleWords[i]);
            }
        }
        return suggestedWords;
    }

    public reset ()
    {
        // Prevents suggestions from getting boring
        this._possibleWords = [...realText].sort(() => Math.random() - 0.5);
    }

    //#endregion
}

export default SuggestionBox;
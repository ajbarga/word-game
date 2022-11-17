// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import text from './resources/dictionary';
import realText from './resources/realWords';
const CHARS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

class WordleDriver
{
    //#region Non-Public Properties

    private _answerC: number[] = [];
    private _answer: string = '';
    private _charInv: number[] = [...CHARS];

    //#endregion

    //#region Non-Public Methods

    private pickWord (): string
    {
        let rand = Math.floor(Math.random() * realText.length);
        return realText[rand];
    }

    private isGuessable (word: string): boolean
    {
        return text.includes(word);
    }

    //#endregion

    //#region Public Interface

    constructor()
    {
        this.reset();
    }

    makeGuess (word: string): number[]
    {
        let response: number[] = [0, 0, 0, 0, 0];
        let charAt: number[] = [...this._charInv];

        if (word == this._answer)
        {
            return [0];
        }
        if (this.isGuessable(word)) 
        {
            for (let i = 0; i < 5; i++) 
            {
                let ch = word.charCodeAt(i);

                if (this._answerC[i] == ch) 
                {
                    response[i] = 1;
                    charAt[ch - 65]--;
                }
                else if (charAt[ch - 65] > 0 && (charAt[ch - 65] > 1 || word[this._answer.indexOf(word[i])] != word[i]))
                {
                    response[i] = 0;
                    charAt[ch - 65]--;
                }
                else
                {
                    response[i] = -1;
                }

            }
            return response;
        }
        return [];
    }

    reset ()
    {
        this._answer = this.pickWord();
        this._answerC = [];
        this._charInv = [...CHARS];
        for (let i = 0; i < 5; i++) 
        {
            let n = this._answer.charCodeAt(i);
            this._answerC.push(n);
            this._charInv[n - 65]++;
        }
    }

    //#endregion
}

export default WordleDriver;
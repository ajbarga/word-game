// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import text from "./resources/dictionary";
import realText from "./resources/realWords";
const CHARS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

class WordleDriver
{
    private _answerC: number[] = [];
    private _answer: string = "";
    private _charInv: number[] = [...CHARS];

    constructor()
    {
        this.reset();
    }

    pickWord(): string
    {
        let rand = Math.floor(Math.random() * realText.length);
        return realText[rand];
    }

    isGuessable(word: string): boolean
    {
        return text.includes(word);
    }

    char(c: number): string
    {
        return String.fromCharCode(c);
    }

    makeGuess(word: string): number[]
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
                let count = charAt[ch - 65];

                if (this._answerC[i] == ch) 
                {
                    response[i] = 1;
                    charAt[ch - 65]--;
                }
                else if (count > 0 && (count > 1 || word.charCodeAt(this._answer.indexOf(this.char(ch))) != ch))
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

    reset()
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
}

export default WordleDriver;
// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import WordList from './WordList';
const CHARS = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

class WordleDriver
{
    private _answerC: number[] = [];
    private _answerS: string = '';
    private _playing: number = 0;
    private _charInv: number[] = [...CHARS];
    private _words: WordList = new WordList();

    constructor()
    {
        this.build();
    }

    char(c: number): string{
        return String.fromCharCode(c)
    }

    build ()
    {
        this._answerS = this._words.pick();
        for (let i = 0; i < 5; i++) {
            let n = this._answerS.charCodeAt(i);
            this._answerC.push(n);
            this._charInv[n - 65]++;
        }
    }

    getAnswer () 
    {
        return this._answerS
    }

    makeGuess (word: string): number[]
    {
        let response: number[] = [0,0,0,0,0];
        let charAt: number[] = [...this._charInv]
        let gameOver: number = 0;
        
        if (word == this._answerS)
        {
            return [0]
        } 
        else if (this._playing == 9)
        {
            gameOver = 1;
        }

        if (this._words.is_guessable(word)) 
        {
            this._playing++;
            for (let i = 0; i < 5; i++) 
            {
                let ch = word.charCodeAt(i);
                let count = charAt[ch - 65];
                
                if (this._answerC[i] == ch) 
                {
                    response[i] = 1;
                    charAt[ch - 65]--;
                }
                else if (count > 0 && (count > 1 || word.charCodeAt(this._answerS.indexOf(this.char(ch))) != ch))
                {
                    response[i] = 0
                    charAt[ch - 65]--;
                }
                else
                {
                    response[i] = -1
                }

            }
            return [gameOver, ...response]
        }
        return [];
    }

    reset ()
    {
        this._answerS = this._words.pick();
        this._answerC = [];
        this._playing = 0;
        this._charInv = [...CHARS];
        for (let i = 0; i < 5; i++) {
            let n = this._answerS.charCodeAt(i);
            this._answerC.push(n);
            this._charInv[n - 65]++;
        }
    }
}
export default WordleDriver;
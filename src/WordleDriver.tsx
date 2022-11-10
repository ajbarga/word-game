// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import WordList from './WordList';
const CH = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

class WordleDriver
{
    private _answerC: number[] = [];
    private _answerS: string = '';
    private _playing: number = 0;
    private _charInst: number[] = [...CH];
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
            this._charInst[n - 65]++;
        }
    }

    makeGuess (word: string): string
    {
        this._playing++;
        let cht = [...this._charInst]
        let loss = false;
        if (this._playing == 9)
        {
            if (word != this._answerS)
            {
                loss = true;
            }
        }

        if (this._words.is_guessable(word)) 
        {
            let str: string = "";
            let ch: number;
            for (let i = 0; i < 5; i++) 
            {
                ch = word.charCodeAt(i);
                if (this._answerC[i] == ch) 
                {
                    str = str + "e" + this.char(ch);
                    cht[ch - 65]--;
                }
                else if (cht[ch - 65] > 0) 
                {
                    if (cht[ch - 65] == 1 && word.charCodeAt(this._answerS.indexOf(this.char(ch))) == ch)
                    {
                        str = str + "w" + this.char(ch);
                    }
                    else 
                    {
                        str = str + "c" + this.char(ch);
                        cht[ch - 65]--;
                    }
                }
                else
                {
                    str = str + "w" + this.char(ch);
                }

            }
            if (word == this._answerS)
            {
                str = str + "123456";
            }
            else if (loss)
            {
                str = str + this._answerS;
            }
            return str.toString();
        }
        else 
        {
            this._playing--;
            return "";
        }
    }

    reset ()
    {
        this._answerS = this._words.pick();
        this._answerC = [];
        this._playing = 0;
        this._charInst = [...CH];
        for (let i = 0; i < 5; i++) {
            let n = this._answerS.charCodeAt(i);
            this._answerC.push(n);
            this._charInst[n - 65]++;
        }
    }
}
export default WordleDriver;
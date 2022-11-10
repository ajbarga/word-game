// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import text from './resources/dictionary'

class SuggestionBox
{
    private _wordList: string[];

    char(c: number): string
    {
        return String.fromCharCode(c)
    }

    analyzeGuess (guess: string, remainingWordList: string[])
    {
        let fullWordList: string[] = [...remainingWordList];
        let nContain: number[] = [];
        let possible: string = "";
        let contain: string = "";

        for (let i = 0; i < 5; i++) 
        {
            let ch: number = guess.charCodeAt(2 * i);
            let ch2: number = guess.charCodeAt(2 * i + 1);
            if (ch == 99)
            {
                contain = contain + i + this.char(ch2);
            }
            else if (ch == 101) 
            {
                possible = possible + i + this.char(ch2);
            }
            else 
            {
                nContain.push(ch2);
            }
        }

        let yel: number;
        let grn: number;

        for (let word in fullWordList) 
        {
            let bad: boolean = true;
            for (let j = 0; j < possible.length; j += 2) 
            {
                if (word.charAt(possible.charCodeAt(j) - 48) != possible.charAt(j + 1)) 
                {
                    bad = false;
                    break;
                }
            }
            for (let j = 0; j < contain.length; j += 2) 
            {
                if (word.charAt(contain.charCodeAt(j) - 48) == contain.charAt(j + 1) || word.indexOf(contain.charAt(j + 1)) == undefined) 
                {
                    bad = false;
                    break;
                }
            }
            if (bad) {
                for (let i = 0; i < nContain.length; i++) {
                    let char = nContain[i]
                    yel = contain.indexOf(this.char(char)) - 1;
                    grn = possible.indexOf(this.char(char)) - 1;
                    if (word.indexOf(this.char(nContain[i])) != undefined && (contain.indexOf(this.char(char)) == undefined || contain.charCodeAt(yel) - 48 == word.indexOf(this.char(char))) &&(possible.indexOf(this.char(char)) || possible.charCodeAt(grn) - 48 != word.indexOf(this.char(char)))) 
                    {
                        delete remainingWordList[word];
                        break;
                    }
                }
            }
            else {
                delete remainingWordList[word];
            }
        }
    }

    constructor ()
    {
        this._wordList = [...text];
    }

    guesserApp (guess: string): string
    {
        let newList: string[] = [];
        this.analyzeGuess(guess, this._wordList);
        for (let m = 0; (m < this._wordList.length) && (m < 8); m++)
            newList.push(this._wordList[m]);
        return newList.toString();
    }

    reset ()
    {
        this._wordList = [...text];
    }

}

export default SuggestionBox;
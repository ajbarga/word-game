// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import text from './resources/dictionary';

let wordList: string[];

class SuggestionBox
{
    char(c: number): string
    {
        return String.fromCharCode(c);
    }

    analyzeGuess(guess: string, remainingWordList: string[])
    {
        let fullWordList: string[] = [...remainingWordList];
        let nContain: number[] = [];
        let possible: string = '';
        let contain: string = '';

        for (let i = 0; i < 5; i++)
        {
            let c1: number = guess.charCodeAt(2 * i);
            let c2: number = guess.charCodeAt(2 * i + 1);
            if (c1 == 'c'.charCodeAt(0))
            {
                contain = contain + i + this.char(c2);
            }
            else if (c1 == 'e'.charCodeAt(0))
            {
                possible = possible + i + this.char(c2);
            }
            else
            {
                nContain.push(c2);
            }
        }

        let yel: number = 0;
        let grn: number = 0;
        let pos: string = possible;
        let cont: string = contain;

        for (let word in fullWordList)
        {
            let bad: boolean = true;
            for (let j = 0; j < pos.length; j += 2) 
            {
                if (word.charAt(pos.charCodeAt(j) - 48) !== pos.charAt(j + 1)) 
                {
                    bad = false;
                    break;
                }
            }
            for (let j = 0; j < cont.length; j += 2) 
            {
                if (word.charAt(cont.charCodeAt(j) - 48) == cont.charAt(j + 1) ||
                    word.indexOf(cont.charAt(j + 1)) == undefined) 
                {
                    bad = false;
                    break;
                }
            }
            if (bad) 
            {
                for (let m = 0; m < nContain.length; m++) 
                {
                    let ch: number = nContain[m];

                    yel = cont.indexOf(this.char(ch));
                    grn = pos.indexOf(this.char(ch));

                    yel = (yel == undefined ? -2 : yel - 1);
                    grn = (grn == undefined ? -2 : grn - 1);

                    let idx = word.indexOf(this.char(ch));
                    if ((idx != undefined) &&
                        (yel == -2 || cont.charCodeAt(yel) - 48 == idx) &&
                        (grn == -2 || pos.charCodeAt(grn) - 48 !== idx))
                    {
                        delete remainingWordList[word];
                        break;
                    }
                }
            }

            else 
            {
                delete remainingWordList[word];
            }
        }
    }

    constructor()
    {
        wordList = [...text];
    }

    guesserApp(guess: string): string[]
    {
        let newList: string[] = [];
        this.analyzeGuess(guess, wordList);
        let m: number = 0;
        while (m < wordList.length && newList.length < 8)
        {

            let w: string = wordList[m];
            if (w != undefined)
            {
                alert(w);
                newList.push(wordList[m]);
            }
            m++;
        }
        return newList;
    }

    reset()
    {
        wordList = [...text];
    }

}

export default SuggestionBox;
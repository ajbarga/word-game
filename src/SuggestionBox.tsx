// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import text from './resources/dictionary';

let wordList: string[];

class SuggestionBox
{
    private _wordList: string[] = [...text];
    
    char(c: number): string
    {
        return String.fromCharCode(c);
    }

    analyzeGuess(guess: string, colors: number[])
    {
        let fullWordList: string[] = [...wordList];

        let yel: number = 0;
        let grn: number = 0;

        fullWordList.forEach((word, idx) =>
        {
            for (let i = 0; i < 5; i++) 
            {
                if (colors[i] === 0)
                {
                    if (word.charAt(i) == guess.charAt(i) ||
                        word.indexOf(guess.charAt(i)) === undefined) 
                    {
                        delete wordList[wordList.indexOf(word)];
                        break;
                    }
                }
                else if(colors[i] === 1)
                {
                    if (word.charAt(i) != guess.charAt(i)) 
                    {
                        delete wordList[wordList.indexOf(word)];
                        break;
                    }
                }  
                else if (colors[i] === -1)
                {
                    if(word.indexOf(guess.charAt(i)) !== undefined)
                    {
                        delete wordList[wordList.indexOf(word)];
                        break;
                    }
                }
            }
        })
    }

    constructor()
    {
        wordList = this._wordList;
    }

    guesserApp(guess: string, colors: number[]): string[]
    {
        let newList: string[] = [];
        this.analyzeGuess(guess, colors);
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
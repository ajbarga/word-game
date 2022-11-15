// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import text from './resources/dictionary';

class SuggestionBox
{
    private _wordList: string[] = [...text];

    analyzeGuess(guess: string, colors: number[])
    {
        for(let k = this._wordList.length - 1; k > -1; k--)
        {
            let word: string = this._wordList[k];
            if(word !== undefined)
            {
                for (let i = 0; i < 5; i++) 
                {
                    let char: string = guess.charAt(i)
                    if (colors[i] === 0)
                    {
                        if (word.charAt(i) == char ||
                            word.indexOf(char) === undefined) 
                        {
                            delete this._wordList[k];
                            break;
                        }
                    }
                    else if(colors[i] === 1)
                    {
                        if (word.charAt(i) != char) 
                        {
                            delete this._wordList[k];
                            break;
                        }
                    }  
                    else if (colors[i] === -1)
                    {
                        if(word.indexOf(char) !== undefined && guess.indexOf(char) === i)
                        {
                            delete this._wordList[k];
                            break;
                        }
                    }
                }
            }
        }
    }

    constructor()
    {
        this._wordList = [...text]
    }

    guesserApp(guess: string, colors: number[]): string[]
    {
        let newList: string[] = [];
        this.analyzeGuess(guess, colors);
        let m: number = 0;
        while (m < this._wordList.length && newList.length < 8)
        {

            let w: string = this._wordList[m];
            if (w != undefined)
            {
                newList.push(this._wordList[m]);
            }
            m++;
        }
        return newList;
    }

    reset()
    {
        this._wordList = [...text];
    }

}

export default SuggestionBox;
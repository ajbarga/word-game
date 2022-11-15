// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import realText from './resources/realWords';

class SuggestionBox
{
    //region Non-Public Properties

    private _wordList: string[] = [];

    //endregion

    //region Non-Public Methods

    private analyzeGuess(guess: string, colors: number[])
    {
        for(let k = this._wordList.length - 1; k > -1; k--)
        {
            let word: string = this._wordList[k];
            if(word !== undefined)
            {
                let containedChars: string = "";
                let isDeleted: boolean = false;

                for (let i = 0; i < 5; i++) 
                {
                    let char: number = guess.charCodeAt(i)
                    let wChar: number = word.charCodeAt(i)

                    if (colors[i] === 0)
                    {
                        containedChars += guess[i];
                        if (wChar === char || word.indexOf(guess[i]) === -1) 
                        {
                            isDeleted = true;
                            break;
                        }
                    }
                    else if(colors[i] === 1)
                    {
                        containedChars += guess[i]
                        if (wChar !== char) 
                        {
                            isDeleted = true;
                            break;
                        }
                    } 
                }
                if (!isDeleted)
                {
                    for(let i = 0; i < 5; i++)
                    {
                        if(word.indexOf(guess[i]) !== -1 && containedChars.indexOf(guess[i]) === -1)
                        {
                            isDeleted = true;
                            break;
                        }
                    }
                }
                if (isDeleted)
                {
                    delete this._wordList[k];
                }
            }
        }
    }

    //endregion

    //region Public Interface

    constructor()
    {
        this.reset();
    }

    makeGuess(guess: string, colors: number[]): string[]
    {
        let newList: string[] = [];
        this.analyzeGuess(guess, colors);
        let m: number = 0;
        while (m < this._wordList.length && newList.length < 5)
        {

            let w: string = this._wordList[m];
            if (w !== undefined)
            {
                newList.push(this._wordList[m]);
            }
            m++;
        }
        return newList;
    }

    reset()
    {
        this._wordList = [...realText];
        this._wordList = this._wordList.sort(() => Math.random() - 0.5)
    }

    //endregion
}

export default SuggestionBox;
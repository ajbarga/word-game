// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import SuggestionBox from './SuggestionBox';
import WordleDriver from './WordleDriver';

class GameDriver
{
    //#region Non-Public Properties / Data-Members

    private _wordleDrivers: WordleDriver[] = [new WordleDriver(), new WordleDriver(), new WordleDriver(), new WordleDriver()];
    private _suggestionBoxes: SuggestionBox[] = [new SuggestionBox(), new SuggestionBox(), new SuggestionBox(), new SuggestionBox()];

    //#endregion

    //#region Public Interface

    guess (word: string): number[][] 
    {
        let responses: number[][] = [[], [], [], []];
        for (let i = 0; i < 4; i++) 
        {
            responses[i] = this._wordleDrivers[i].makeGuess(word);
        }
        return responses;
    }

    analyze (i: number, word: string, colors: number[]): string
    {
        let response: string[] = this._suggestionBoxes[i].makeGuess(word, colors);
        return response.toString().replaceAll(',', ', ');
    }

    reset (): void 
    {
        for (let i = 0; i < 4; i++) 
        {
            this._wordleDrivers[i].reset();
            this._suggestionBoxes[i].reset();
        }
    }

    //#endregion
}

export default GameDriver;
// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import SuggestionBox from './SuggestionBox';
import WordDriver from './WordDriver';

class GameDriver
{
    //#region Non-Public Properties / Data-Members

    private _wordDrivers: WordDriver[] = [new WordDriver(), new WordDriver(), new WordDriver(), new WordDriver()];
    private _suggestionBoxes: SuggestionBox[] = [new SuggestionBox(), new SuggestionBox(), new SuggestionBox(), new SuggestionBox()];

    //#endregion

    //#region Public Interface

    public guess (word: string): number[][] 
    {
        let responses: number[][] = [[], [], [], []];
        for (let i = 0; i < 4; i++) 
        {
            responses[i] = this._wordDrivers[i].makeGuess(word);
        }
        return responses;
    }

    public get_answer (i: number): string
    {
        return this._wordDrivers[i].getAnswer();
    }

    public analyze (i: number, word: string, colors: number[]): string
    {
        let response: string[] = this._suggestionBoxes[i].makeGuess(word, colors);
        return response.toString().replaceAll(',', ', ');
    }

    public reset (): void 
    {
        for (let i = 0; i < 4; i++) 
        {
            this._wordDrivers[i].reset();
            this._suggestionBoxes[i].reset();
        }
    }

    //#endregion
}

export default GameDriver;
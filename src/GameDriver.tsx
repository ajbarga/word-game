// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import SuggestionBox from './SuggestionBox';
import WordleDriver from './WordleDriver';

class GameDriver
{
    //#region Non-Public Properties

    private wordleDrivers: WordleDriver[] = [new WordleDriver(), new WordleDriver(), new WordleDriver(), new WordleDriver()];
    private suggestionBoxes: SuggestionBox[] = [new SuggestionBox(), new SuggestionBox(), new SuggestionBox(), new SuggestionBox()];

    //#endregion

    //#region Public Interface

    guess (word: string): number[][] 
    {
        let responses: number[][] = [[], [], [], []];
        for (let i = 0; i < 4; i++) 
        {
            responses[i] = this.wordleDrivers[i].makeGuess(word);
        }
        return responses;
    }

    analyze (i: number, word: string, colors: number[]): string
    {
        let response: string[] = this.suggestionBoxes[i].makeGuess(word, colors);
        return response.toString().replaceAll(',', ', ');
    }

    reset (): void 
    {
        for (let i = 0; i < 4; i++) 
        {
            this.wordleDrivers[i].reset();
            this.suggestionBoxes[i].reset();
        }
    }

    //#endregion
}

export default GameDriver;
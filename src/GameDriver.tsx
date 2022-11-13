// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import SuggestionBox from './SuggestionBox';
import WordleDriver from './WordleDriver';

class GameDriver
{
    private wordleDrivers: WordleDriver[] = [new WordleDriver(), new WordleDriver(), new WordleDriver(), new WordleDriver()];
    private suggestionBoxes: SuggestionBox[] = [new SuggestionBox(), new SuggestionBox(), new SuggestionBox(), new SuggestionBox()];

    guess(word: string): number[][] 
    {
        let responses: number[][] = [[], [], [], []];
        for (let i = 0; i < 4; i++) 
        {
            responses[i] = this.wordleDrivers[i].makeGuess(word);
        }
        return responses;
    }

    analyze(i: number, word: string, colors: number[]): string[]
    {
        return this.suggestionBoxes[i].guesserApp(word);
    }

    reset(): void 
    {
        for (let k = 0; k < 4; k++) 
        {
            this.wordleDrivers[k].reset();
            this.suggestionBoxes[k].reset();
        }
    }
}

export default GameDriver;
// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import WordleDriver from "./WordleDriver";

class GameDriver{

    private wordleDrivers: WordleDriver[] = [new WordleDriver(), new WordleDriver(), new WordleDriver(), new WordleDriver()];

    guess (word: string): string[] {
        let responses: string[] = ["","","",""];
        for (let i = 0; i < 4; i++) {
            responses[i] = this.wordleDrivers[i].makeGuess(word);
        }
        return responses;
    }

    reset() {
        for (let i = 0; i < 4; i++) {
            this.wordleDrivers[i].reset();
        }
        return "";
    }
    
}
export default GameDriver
// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import GameDriver from './GameDriver';

class GameBoxManager
{
    //#region Non-Public Properties / Data-Members

    private _game: GameDriver;
    private _rows: string[][];
    private _suggestedWords: string[];
    private _boxColors: number[][][];
    private _guessCount: number[];

    private readonly EC: number[] = [-1, -1, -1, -1, -1];
    private readonly EmptyRow: string[] = ['', '', '', '', '', '', '', '', ''];
    private readonly EmptyColors: number[][] = [this.EC, this.EC, this.EC, this.EC, this.EC, this.EC, this.EC, this.EC, this.EC];
    private readonly HintText: string = "ENTER FIRST GUESS";

    //#endregion

    //#region Public Interface

    public constructor()
    {
        this._game = new GameDriver();
        this._rows = [];
        this._suggestedWords = [];
        this._boxColors = [];
        this._guessCount = [];
    }

    public makeGuess (guess: string): boolean
    {
        const response: number[][] = this._game.guess(guess);
        if (response[0].length > 0)
        {
            for (let i = 0; i < 4; i++)
            {
                const j: number = this._guessCount[i];
                if (j < 9)
                {
                    this._rows[i][j] = guess;
                    if (response[i].length === 1)
                    {
                        this._boxColors[i][j] = [1, 1, 1, 1, 1];
                        this._suggestedWords[i] = ':)\tNice Job\t<3';
                        this._guessCount[i] = 10;
                    }
                    else
                    {
                        this._boxColors[i][j] = response[i];
                        this._suggestedWords[i] = this._game.analyze(i, guess, response[i]);
                        this._guessCount[i]++;
                    }
                }
                if (this._guessCount[i] === 9)
                {
                    this._suggestedWords[i] = "Answer: " + this._game.get_answer(i);
                    this._guessCount[i]++;
                }
            }
            return true;
        }
        return false;
    }

    public updateRowsTyping (e: string)
    {
        const num = this._guessCount;
        const len = e.length;
        for (let i = 0; i < 4; i++)
        {
            let n = num[i];
            if (n < 9)
            {
                this._rows[i][n] = e.toUpperCase() + ' '.repeat(5 - len);
            }
        }
    }

    public setupInterface (): [string[][], string[], number[][][]]
    {
        this._guessCount = [0, 0, 0, 0];
        this._suggestedWords = [this.HintText, this.HintText, this.HintText, this.HintText];
        for (let i = 0; i < 4; i++)
        {
            for (let j = 0; j < 9; j++)
            {
                this._rows[i] = [...this.EmptyRow];
                this._boxColors[i] = [...this.EmptyColors];
            }
        }
        return [this._rows, this._suggestedWords, this._boxColors];
    };

    public reset (): string[]
    {
        this._game.reset();
        return this.setupInterface()[1];
    }

    //#endregion
}

export default GameBoxManager;
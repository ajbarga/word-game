// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import React, { Component } from 'react';
import GameBox from './app-components/multi-game-module';
import Keyboard from './app-components/keyboard';
import InputBox from './app-components/input-box';
import HeaderButtons from './app-components/header-buttons';
import GameDriver from './GameDriver';

import './css/App.css';

interface Wordle
{
    rows: string[][];
    inputValue: string[];
    wordList: string[];
    responseColor: string;
    colors: number[][][];
    hints: boolean;
}

let App: WordleApp;
let Game: GameDriver;
let Rows: string[][];
let WordList: string[];
let BoxColors: number[][][];
let GuessCount: number[];

//empty row string
const eR: string = 'AAAAA';
const emptyRow: string[] = [eR, eR, eR, eR, eR, eR, eR, eR, eR];

//default row color array
const eC: number[] = [-2, -2, -2, -2, -2];
const emptyColors: number[][] = [eC, eC, eC, eC, eC, eC, eC, eC, eC];

//default input box
const emptyInput: string[] = ['1', '1', '1', '1', '1'];

class WordleApp extends Component<{}, Wordle>
{
    //#region Non-Public Interface

    private constructor(props: Wordle)
    {
        super(props);
        App = this;
        Game = new GameDriver();
        Rows = [];
        BoxColors = [];
        GuessCount = [];
        WordList = [];

        this.setupInterface();

        this.state = ({ 
            rows: Rows, 
            colors: BoxColors, 
            wordList: WordList,
            responseColor: 'plain',  
            inputValue: emptyInput, 
            hints: false
        });
    }

    private makeGuess (guessVal: string): void
    {
        const guess: string = guessVal.toUpperCase();
        const response: number[][] = Game.guess(guess);

        if (response[0].length > 0)
        {
            for (let i = 0; i < 4; i++)
            {
                const j: number = GuessCount[i];
                if (j < 9)
                {
                    Rows[i][j] = guess;
                    if (response[i].length === 1)
                    {
                        BoxColors[i][j] = [1, 1, 1, 1, 1];
                        WordList[i] = ':)\tNice Job\t<3';
                        GuessCount[i] = 9;
                    }
                    else
                    {
                        BoxColors[i][j] = response[i];
                        WordList[i] = Game.analyze(i, guess, response[i]);
                        GuessCount[i]++;
                    }
                }
            }
            App.setState({ rows: Rows, colors: BoxColors, wordList: WordList });
        }
        else
        {
            App.invalidGuessSequence();
        }
    };

    private async invalidGuessSequence (): Promise<void>
    {
        App.setState({ responseColor: 'error' });
        await new Promise(r => setTimeout(r, 1500));
        App.setState({ responseColor: 'plain' });
    }

    private setupInterface (): void
    {
        GuessCount = [0, 0, 0, 0];
        const hintText: string = 'ENTER FIRST GUESS';
        WordList = [hintText, hintText, hintText, hintText];
        for (let i = 0; i < 4; i++)
        {
            for (let j = 0; j < 9; j++)
            {
                Rows[i] = [...emptyRow];
                BoxColors[i] = [...emptyColors];
            }
        }
    };

    //#endregion

    //#region Event-Handler Buttons

    private reset (): void
    {
        Game.reset();
        App.setupInterface();
        App.setState({ rows: Rows, colors: BoxColors, wordList: WordList });
    };

    private swapHintState()
    {
        let isHintsOn: boolean = App.state.hints;
        App.setState({hints: !isHintsOn});
    }

    //#endregion

    //#region Html Element

    render ()
    {
        return (
            <div className={'appBox'}>
                <div className={'container headerBox'}>
                    <p className={'titleBox'} id={App.state.responseColor}>Wordle</p>
                </div>
                <HeaderButtons reset={App.reset} swapHintState={App.swapHintState} hints={App.state.hints}/>
                <GameBox rowSt={App.state.rows} colorState={App.state.colors}
                    wordBox={App.state.wordList} hintState={App.state.hints ? '#FFC0CB' : 'transparent'} />
                <InputBox text={App.state.inputValue} />
                <Keyboard getGuess={App.makeGuess} text={App.state.inputValue} setText={(e) => App.setState({ inputValue: e })} />
            </div>
        );
    };

    //#endregion
}

export default WordleApp;

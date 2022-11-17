// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import React, { Component, SyntheticEvent } from 'react';
import GameBox from './app-components/games-module';
import Keyboard from './app-components/keyboard';
import GameDriver from './GameDriver';

import './css/App.css';

interface Wordle
{
    rows: string[][];
    inputValue: string[];
    wordList: string[];
    responseColor: string;
    colors: number[][][];
    darkMode: boolean;
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
const oneRow: string[] = [eR, eR, eR, eR, eR, eR, eR, eR, eR];

//default row color array
const nC: number[] = [-2, -2, -2, -2, -2];
const emptyColors: number[][] = [nC, nC, nC, nC, nC, nC, nC, nC, nC];

class WordleApp extends Component<{}, Wordle>
{
    //#region Non-Public Properties

    private _gameDriver: GameDriver = new GameDriver();
    private _rows: string[][] = [];
    private _colors: number[][][] = [];
    private _guesses: number[] = [];
    private _wordList: string[] = [];

    //#endregion

    //#region Non-Public Methods

    private constructor(props: Wordle)
    {
        super(props);
        App = this;
        Game = this._gameDriver;

        Rows = this._rows;
        BoxColors = this._colors;
        GuessCount = this._guesses;
        WordList = this._wordList;

        this.setupInterface();
        this.state = ({ rows: Rows, colors: BoxColors, wordList: WordList, darkMode: false, responseColor: 'plain', hints: false, inputValue: ['1', '1', '1', '1', '1'] });
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
        WordList = ['A', 'A', 'A', 'A'];
        for (let i = 0; i < 4; i++)
        {
            for (let j = 0; j < 9; j++)
            {
                Rows[i] = [...oneRow];
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
        App.forceUpdate();
    };

    private swapHintState (): void
    {
        let isHintsOn: boolean = !App.state.hints;

        App.setState({ hints: isHintsOn });
    };

    private swapColorMode (): void
    {
        let isDarkMode: boolean = App.state.darkMode;

        let divs: NodeListOf<HTMLElement> = document.querySelectorAll('input,p,div.container,div.key-box,button');
        divs.forEach(i => isDarkMode ? i.classList.remove('dm') : i.classList.add('dm'));
        document.body.style.backgroundColor = (isDarkMode ? 'thistle' : '#262626');

        App.setState({ darkMode: !isDarkMode });
    };

    private async disable (e: SyntheticEvent)
    {
        (e.target as HTMLInputElement).disabled = true;
        await new Promise(r => setTimeout(r, 5));
        (e.target as HTMLInputElement).disabled = false;
    }

    //#endregion

    //#region Html Element

    render ()
    {
        return (
            <div className={'appBox'}>
                <div className={'container buttons headerBox'}>
                    <input type='button' className='headerButton'
                        onClick={(e) => { App.reset(); App.disable(e); }} value={'RESET'} />
                    <input type='button' className='headerButton'
                        onClick={(e) => { App.swapColorMode(); App.disable(e); }} value={'MODE: ' + (App.state.darkMode ? 'NIGHT' : 'DAY')} />
                    <input type='button' className='headerButton'
                        onClick={(e) => { App.swapHintState(); App.disable(e); }} value={'HINTS: ' + (App.state.hints ? 'ON' : 'OFF')} />
                </div>
                <div className={'container headerBox'}>
                    <p className={'titleBox'} id={App.state.responseColor}>Wordle</p>
                </div>
                <GameBox rowSt={App.state.rows} colorState={App.state.colors}
                    wordBox={App.state.wordList} hintState={App.state.hints ? '#FFC0CB' : 'transparent'} />
                <div className={'container wordContainer'} id={'input'}>
                    <p className={'word letter l' + App.state.inputValue[0]}>{App.state.inputValue[0]}</p>
                    <p className={'word letter l' + App.state.inputValue[1]}>{App.state.inputValue[1]}</p>
                    <p className={'word letter l' + App.state.inputValue[2]}>{App.state.inputValue[2]}</p>
                    <p className={'word letter l' + App.state.inputValue[3]}>{App.state.inputValue[3]}</p>
                    <p className={'word letter l' + App.state.inputValue[4]}>{App.state.inputValue[4]}</p>
                </div>
                <Keyboard getGuess={App.makeGuess} inputText={App.state.inputValue} setText={(e) => App.setState({ inputValue: e })} />
            </div>
        );
    };

    //#endregion
}

export default WordleApp;

// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import React, { Component } from 'react';
import RowBox from './app-components/games-module';
import Keyboard from './app-components/keyboard';
import GameDriver from './GameDriver';

import './css/App.css';

interface Wordle
{
    rows: string[][];
    colors: number[][][];
    wordList: string[];
    colorMode: string;
    responseColor: string;
    hints: string;
}

let App: WordleApp;
let Game: GameDriver;
let Rows: string[][];
let BoxColors: number[][][];
let GuessCount: number[];
let WordList: string[];

//empty row string
const eR: string = '     ';
const oneRow: string[] = [eR, eR, eR, eR, eR, eR, eR, eR, eR];

//default row color array
const nC: number[] = [-1, -1, -1, -1, -1]
const emptyColors: number[][] = [nC, nC, nC, nC, nC, nC, nC, nC, nC];

class WordleApp extends Component<{}, Wordle>
{
    //region Non-Public Properties

    private _gameDriver: GameDriver = new GameDriver();
    private _rows: string[][] = [];
    private _colors: number[][][] = [];
    private _guesses: number[] = [];
    private _wordList: string[] = []

    //endregion

    //region Non-Public Methods

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
        this.state = ({ rows: Rows, colors: BoxColors, wordList: WordList, colorMode: 'DAY', responseColor: 'plain', hints: 'OFF' });
    }

    private makeGuess(guessVal: string): void
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
                    if(response[i].length === 1)
                    {
                        BoxColors[i][j] = [1, 1, 1, 1, 1] ;
                        WordList[i] = ":)\tNice Job\t<3";
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
            App.setState({rows: Rows, colors: BoxColors, wordList: WordList});
        }
        else
        {
            App.invalidGuessSequence();
        }
    };

    private async invalidGuessSequence(): Promise<void>
    {
        App.setState({responseColor: 'error'});
        await new Promise(r => setTimeout(r, 1500));
        App.setState({responseColor: 'plain'});
    }

    private setupInterface(): void
    {
        GuessCount = [0, 0, 0, 0];
        WordList = ['', '', '', ''];
        for (let i = 0; i < 4; i++)
        {
            for (let j = 0; j < 9; j++)
            {
                Rows[i] = [...oneRow];
                BoxColors[i] = [...emptyColors];
            }
        }
    };

    //endregion

    // Region Event-Handler Buttons

    private reset(): void
    {
        Game.reset();
        App.setupInterface();
        App.forceUpdate();
    };

    private swapHintState(): void
    {
        let isHintsOn: boolean = App.state.hints == 'ON';

        let ansBoxes: NodeListOf<HTMLButtonElement> = document.querySelectorAll('#ans-box');
        ansBoxes.forEach(i => isHintsOn ? i.style.textIndent = '-9999px' : i.style.textIndent = '0px');
        
        App.setState({hints: (isHintsOn ? 'OFF' : 'ON')})
    };

    private swapColorMode(): void
    {
        let isDarkMode: boolean = App.state.colorMode == 'NIGHT';

        let divs:NodeListOf<HTMLElement> = document.querySelectorAll('input,p,div.container,div.key-box,button');
        divs.forEach(i => isDarkMode ? i.classList.remove('dm') : i.classList.add('dm'));
        document.body.style.backgroundColor = (isDarkMode ? 'thistle' : '#262626');

        App.setState({ colorMode: (isDarkMode ? "DAY" : "NIGHT")});
    };

    //endregion

    //region Html Element

    render()
    {
        return (
            <div className={'big-box'}>
                <div className={'container'} id={'titleBox'}>
                    <input type='button' className="headerButton" onClick={App.reset} value={"RESET"}/>
                    <input type='button' className="headerButton" onClick={App.swapColorMode} value={"MODE: " + App.state.colorMode} />
                    <input type='button' className="headerButton" onClick={App.swapHintState} value={"HINTS: " + App.state.hints} />
                </div>
                <div className={'container'} id={'titleBox'}>
                    <p className={'title-box'} id={App.state.responseColor}>Wordle</p>
                </div>
                <RowBox rowSt={App.state.rows} colorState={App.state.colors} wordBox={WordList} />
                <div className={'container'} id={'wordInputBox'}>
                    <input disabled={true} className={'wordInput'} id={'wordBox'} type={'text'} maxLength={5} />
                </div>
                <div className={'container'} id={'keyContainer'}>
                    <Keyboard getGuess={(g) => App.makeGuess(g)} />
                </div>
            </div>
        );
    };

    //endregion
}

export default WordleApp;

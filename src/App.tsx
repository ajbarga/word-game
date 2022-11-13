// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import './css/App.css';

import React, { Component } from 'react';
import RowBox from './app-components/row-box';
import Keyboard from './app-components/keyboard';
import GameDriver from './GameDriver';

interface Wordle
{
    rows: string[][];
    colors: number[][][];
    wordList: string[];
}

const emptyWord: string = '     ';
const oneRow: string[] = [
    emptyWord, emptyWord, emptyWord,
    emptyWord, emptyWord, emptyWord,
    emptyWord, emptyWord, emptyWord
];

const emptyColors: number[][] = [
    [-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1], [-1, -1, -1, -1, -1]
];


let help = true;
let titleColor: string = 'tB';
let wordList: any = ['', '', '', ''];

let App: WordleApp;
let Game: GameDriver;
let Rows: string[][];
let BoxColors: number[][][];
let GuessCount: number[];

class WordleApp extends Component<{}, Wordle>
{
    private _gameDriver: GameDriver = new GameDriver();
    private _rowState: string[][] = [];
    private _colorState: number[][][] = [];
    private _guessesLeft: number[] = [];

    constructor(props: Wordle)
    {
        super(props);
        App = this;

        Game = this._gameDriver;
        Rows = this._rowState;
        BoxColors = this._colorState;
        GuessCount = this._guessesLeft;

        this.resetRows();
        this.state = ({ rows: Rows, colors: BoxColors, wordList: wordList });
    }

    async makeGuess(guessVal: string)
    {
        let response: number[][] = Game.guess(guessVal.toUpperCase());
        if (response[0].length == 0)
        {
            await App.invalidGuessSequence();
        }
        else
        {
            for (let i = 0; i < 4; i++)
            {

                if (GuessCount[i] < 9)
                {
                    let status: boolean = (response[i].length === 1);
                    let rowColors: number[] = (status ? [1, 1, 1, 1, 1] : response[i]);

                    Rows[i][GuessCount[i]] = guessVal.toLowerCase();
                    BoxColors[i][GuessCount[i]] = rowColors;
                    status ? GuessCount[i] = 9 : GuessCount[i]++;

                    await App.analyzeGuess(i, guessVal, rowColors);
                }
            }
        }
        App.forceUpdate();
    };

    async analyzeGuess(i: number, word: string, colors: number[])
    {
        let t = Game.analyze(i, word, colors).toString();
        wordList[i] = t.substring(1, t.length - 1);
        App.forceUpdate();
    };

    async invalidGuessSequence()
    {
        titleColor = 'rTB';
        App.forceUpdate();
        await App.timeout(1500);
        titleColor = 'tB';
    }

    resetRows() 
    {
        GuessCount = [0, 0, 0, 0];
        wordList = ['', '', '', ''];
        for (let i = 0; i < 4; i++)
        {
            for (let j = 0; j < 9; j++)
            {
                Rows[i] = [...oneRow];
                BoxColors[i] = [...emptyColors];
            }
        }
    };

    reset()
    {
        App.resetRows();
        Game.reset();
        titleColor = 'tB';
        (document.getElementById('wordBox') as HTMLInputElement).value = '';

        App.forceUpdate();
    };

    swapHelper()
    {
        let ansBoxes: NodeListOf<HTMLButtonElement> = document.querySelectorAll('#ans-box');
        if (help)
        {
            ansBoxes.forEach(i => i.style.textIndent = '0px');
        }
        else
        {
            ansBoxes.forEach(i => i.style.textIndent = '-9999px');
        }
        help = !help;
    };

    swapColorMode()
    {
        let divs = document.querySelectorAll('input,p,div.container,div.key-box,button');
        let isDarkMode: boolean = divs[0].classList.contains('dm');

        document.body.style.backgroundColor = (isDarkMode ? 'thistle' : '#262626');
        if (isDarkMode)
        {
            divs.forEach(i => i.classList.remove('dm'));
        }
        else
        {
            divs.forEach(i => i.classList.add('dm'));
        }

    };

    timeout(delay: number)
    {
        return new Promise(res => setTimeout(res, delay));
    };

    render()
    {
        return (
            <div className={'big-box'}>
                <div className={'container tc'} id={'short'}>
                    <button onClick={App.reset}>RESET</button>
                    <button onClick={App.swapColorMode}>SWAP</button>
                    <button onClick={App.swapHelper}>HELP</button>
                </div>
                <div className={'container'}>
                    <p className={'title-box'} id={titleColor}>Wordle</p>
                </div>
                <RowBox rowSt={App.state.rows} colorState={App.state.colors} wordBox={wordList} />
                <div className={'container wc'}>
                    <input disabled={true} className={'word'} id={'wordBox'} type='text' maxLength={5} />
                </div>
                <div className={'container'} id={'keyCont'}>
                    <Keyboard getGuess={(g1: string) => App.makeGuess(g1)} />
                </div>
            </div>
        );
    };
}

export default WordleApp;

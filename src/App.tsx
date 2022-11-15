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

//empty row string
const eR: string = '     ';
const oneRow: string[] = [eR, eR, eR, eR, eR, eR, eR, eR, eR];

//default row color array
const nC: number[] = [-1, -1, -1, -1, -1]
const emptyColors: number[][] = [nC, nC, nC, nC, nC, nC, nC, nC, nC];


let help = true;
let titleColor: string = 'tB';
let wordList: string[] = ['', '', '', ''];

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

        this.resetGUI();
        this.state = ({ rows: Rows, colors: BoxColors, wordList: wordList });
    }

    async makeGuess(guessVal: string)
    {
        const guess = guessVal.toUpperCase()

        let response: number[][] = Game.guess(guess);
        if (response[0].length == 0)
        {
            await App.invalidGuessSequence();
        }
        else
        {
            for (let i = 0; i < 4; i++)
            {
                const j: number = GuessCount[i];

                if (j < 9)
                {
                    const isAnswer: boolean = (response[i].length === 1);
                    const rowColors: number[] = (isAnswer ? [1, 1, 1, 1, 1] : response[i]);

                    Rows[i][j] = j > 0 ? guess : Game.getAnswer(i);

                    BoxColors[i][j] = rowColors;
                    isAnswer ? GuessCount[i] = 9 : GuessCount[i]++;

                    let str = await App.analyzeGuess(i, guess, rowColors);
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

    reset()
    {
        App.resetGUI();
        Game.reset();
        App.forceUpdate();
    };

    resetGUI() 
    {
        titleColor = 'tB';
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

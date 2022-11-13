// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import './css/App.css';

import React, { Component } from 'react';
import RowBox from './app-components/row-box';
import Keyboard from './app-components/keyboard';
import GameDriver from './GameDriver';

interface Quordle
{
    rows: string[][];
    colors: number[][][];
    wordList: any;
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

let num: any = [0, 0, 0, 0];
let help = true;
let darkMode = true;
let titleColor: string = 'tB';

let rows: string[][] = [];
let colors: number[][][] = [];

let wordList: any = ['', '', '', ''];
let gameDriver: GameDriver;
let obj: App;

class App extends Component<{}, Quordle>
{


    constructor(props: Quordle)
    {
        super(props);

        gameDriver = new GameDriver();
        obj = this;

        this.resetRow();
        this.state = ({ rows: rows, colors: colors, wordList: wordList });
    }

    makeGuess = async (guessVal: string) =>
    {
        let response: number[][] = gameDriver.guess(guessVal.toUpperCase());
        if (response[0].length == 0)
        {
            titleColor = 'rTB';
            obj.forceUpdate();
            await obj.timeout(1500);
            titleColor = 'tB';
        }
        else
        {
            for (let i = 0; i < 4; i++)
            {
                let gameState = response[i][0];

                if (num[i] < 9)
                {
                    let rowColors: number[];
                    if (response[i].length === 1)
                    {
                        rowColors = [1, 1, 1, 1, 1];
                    }
                    else
                    {
                        rowColors = response[i].splice(1, 6);
                    }
                    rows[i][num[i]] = guessVal.toLowerCase();
                    colors[i][num[i]] = rowColors;

                    if (gameState === 1)
                    {
                        num[i] = 8;
                    }
                    else
                    {
                        await this.analyzeGuess(i, guessVal, rowColors);
                    }

                    num[i]++;
                    if (response[i].length === 1)
                    {
                        wordList[i] = 'Nice Job! :)';
                    }
                }
            }
        }
        obj.forceUpdate();
    };

    analyzeGuess = async (i: number, word: string, colors: number[]) =>
    {
        let t = gameDriver.analyze(i, word, colors).toString();
        wordList[i] = t.substring(1, t.length - 1);
        obj.forceUpdate();
    };

    resetRow()
    {
        for (let i = 0; i < 4; i++)
        {
            for (let j = 0; j < 9; j++)
            {
                rows[i] = [...oneRow];
                colors[i] = [...emptyColors];
            }
        }
    }

    reset()
    {
        obj.resetRow();
        gameDriver.reset();
        num = [0, 0, 0, 0];
        wordList = ['', '', '', ''];

        titleColor = 'tB';

        (document.getElementById('wordBox') as HTMLInputElement).value = '';

        obj.forceUpdate();
    };

    swapHelper()
    {
        let all = document.querySelectorAll('#ans-box');
        for (let i = 0; i < all.length; i++)
        {
            (all.item(i) as HTMLButtonElement).style.textIndent = (help ? '0px' : '-9999px');
        }
        help = !help;
    };

    swapMode()
    {
        document.body.style.backgroundColor = (darkMode ? '#262626' : 'thistle');

        let divs = document.querySelectorAll('input,p,div.container,div.key-box,button');
        for (let i = 0; i < divs.length; i++)
        {
            if (darkMode)
            {
                divs[i].classList.add('dm');
            }
            else
            {
                divs[i].classList.remove('dm');
            }
        }
        darkMode = !darkMode;
    }

    timeout(delay: number)
    {
        return new Promise(res => setTimeout(res, delay));
    };

    render()
    {
        return (
            <div className={'big-box'}>
                <div className={'container tc'} id={'short'}>
                    <button onClick={this.reset}>RESET</button>
                    <button onClick={this.swapMode}>SWAP</button>
                    <button onClick={this.swapHelper}>HELP</button>
                </div>
                <div className={'container'}>
                    <p className={'title-box'} id={titleColor}>Wordle</p>
                </div>
                <RowBox rowSt={this.state.rows} colorState={this.state.colors} wordBox={wordList} />
                <div className={'container wc'}>
                    <input disabled={true} className={'word'} id={'wordBox'} type='text' maxLength={5} />
                </div>
                <div className={'container'} id={'keyCont'}>
                    <Keyboard getGuess={(g1: string) => this.makeGuess(g1)} />
                </div>
            </div>
        );
    }
}

export default App;

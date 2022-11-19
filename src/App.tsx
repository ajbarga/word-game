// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import React, { Component } from 'react';
import GameBox from './app-components/multi-game-module';
import Keyboard from './app-components/keyboard';
import InputBox from './app-components/input-box';
import HeaderButtons from './app-components/header-buttons';
import GameBoxManager from './GameBoxManager';

import './css/App.css';

interface WordGameProps
{
    rows: string[][],
    inputValue: string[],
    suggestedWords: string[],
    responseColor: string,
    colors: number[][][],
    hints: boolean
}

class WordGameApp extends Component<{}, WordGameProps>
{
    //#region Non-Public Properties / Data-Members

    private _gameManager: GameBoxManager;

    private readonly EmptyInput: string[] = ['1', '1', '1', '1', '1'];

    //#endregion

    //#region Non-Public Interface

    private constructor(props: WordGameProps)
    {
        super(props);

        this._gameManager = new GameBoxManager();
        let state = this._gameManager.setupInterface();

        this.state = ({ 
            rows: state[0],  
            suggestedWords: state[1],
            colors: state[2],
            responseColor: 'plain',  
            inputValue: this.EmptyInput, 
            hints: false
        });
    }

    private makeGuess (guessVal: string)
    {
        if (!this._gameManager.makeGuess(guessVal.toUpperCase()))
        {
            this.invalidGuessSequence();
        }
        this.forceUpdate();
    };

    private async invalidGuessSequence (): Promise<void>
    {
        this.setState({ responseColor: 'error' });
        await new Promise(r => setTimeout(r, 1500));
        this.setState({ responseColor: 'plain' });
    };

    //#endregion

    //#region Event-Handler Buttons

    private reset ()
    {
        this.setState({ suggestedWords: this._gameManager.reset() });
    };

    private swapHintState()
    {
        this.setState({hints: !this.state.hints});
    };

    //#endregion

    //#region Html Element

    render ()
    {
        return (
            <div className={'appBox'}>
                <div className={'container headerBox'}>
                    <p className={'titleBox'} id={this.state.responseColor}>Wordle</p>
                </div>
                <HeaderButtons reset={() => this.reset()} updateHintState={() => this.swapHintState()} hints={this.state.hints}/>
                <GameBox rows={this.state.rows} colors={this.state.colors}
                    suggestedWords={this.state.suggestedWords} hints={this.state.hints ? '#FFC0CB' : 'transparent'} />
                <InputBox text={this.state.inputValue} />
                <Keyboard getGuess={(g) => this.makeGuess(g)} 
                        setText={(e) => this.setState({ inputValue: e })} text={this.state.inputValue}/>
            </div>
        );
    };

    //#endregion
}

export default WordGameApp;

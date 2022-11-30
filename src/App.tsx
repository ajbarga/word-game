// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import { Component, StrictMode } from 'react';
import GameBox from './app-components/multi-game-module';
import Keyboard from './app-components/keyboard';
import HeaderButtons from './app-components/header-buttons';
import GameBoxManager from './GameBoxManager';

import './css/Base.css'; //Universal
import './css/Desktop.css'; //Desktop
import './css/MobileBrowser.css'; //Phone

interface WordGameProps
{
    rows: string[][],
    inputValue: string,
    suggestedWords: string[],
    responseColor: string,
    colors: number[][][],
    hints: boolean,
    isDarkMode: boolean,
}
// Where 0: Desktop, 1: Mobile
const ratio = window.innerHeight / window.innerWidth;
const deviceType: number = ratio < 1.8 && ratio > 1 / 1.8 ? 0 : 1;
const title: string = deviceType === 0 ? 'Worde Desktop' : 'Wordle App';

class WordGameApp extends Component<{}, WordGameProps>
{
    //#region Non-Public Properties / Data-Members

    private _gameManager: GameBoxManager;

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
            inputValue: '',
            hints: false,
            isDarkMode: false
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

    private swapColorMode (): void
    {
        let isDarkMode: boolean = this.state.isDarkMode;

        let divs: NodeListOf<HTMLElement> = document.querySelectorAll('input,p,div,button');
        divs.forEach(i => isDarkMode ? i.classList.remove('dm') : i.classList.add('dm'));
        document.body.style.backgroundColor = (isDarkMode ? 'thistle' : '#262626');
        this.setState({ isDarkMode: !this.state.isDarkMode });
    }

    private swapHintState ()
    {
        this.setState({ hints: !this.state.hints });
    };

    //#endregion

    //#region Html Element

    public render ()
    {
        return (
            <StrictMode>
                <div id={'appBox'}>
                    <div className={'container headerBox'}>
                        <p className={'titleBox'} id={this.state.responseColor} >{title}</p>
                    </div>
                    <HeaderButtons reset={() => this.reset()} updateHintState={() => this.swapHintState()}
                        hints={this.state.hints} isDarkMode={this.state.isDarkMode} swapColorMode={() => this.swapColorMode()} />
                    <GameBox rows={this.state.rows} colors={this.state.colors} colorMode={this.state.isDarkMode}
                        suggestedWords={this.state.suggestedWords} hints={this.state.hints ? '#FFC0CB' : 'transparent'} />
                    <Keyboard getGuess={(g) => this.makeGuess(g)}
                        setText={(e) => { this.setState({ inputValue: e }); this._gameManager.updateRowsTyping(e); }} text={this.state.inputValue} />
                </div>
            </StrictMode>
        );
    };

    //#endregion
}

export default WordGameApp;

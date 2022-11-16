// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import '../css/Keyboard.css';
import React, { Component, SyntheticEvent } from 'react';

interface KeyProps 
{
    getGuess(gs: string): void;
}

let Keys: Keyboard;

class Keyboard extends Component<KeyProps>
{
    //region Non-Public Interface

    private constructor(props: any) 
    {
        super(props);
        Keys = this;
        window.addEventListener('keydown', e => this.listener(e));
    }

    //endregion

    //region Event-Handlers

    input(keyPress: SyntheticEvent) 
    {
        Keys.inputKey((keyPress.target as HTMLInputElement).value)
    }

    inputKey(e: string) 
    {
        let text: HTMLInputElement = document.getElementById('wordBox') as HTMLInputElement;
        if (e === 'Backspace') 
        {
            text.value = text.value.substring(0, text.value.length - 1);
        }
        else if (e === 'Enter') 
        {
            this.props.getGuess(text.value);
            text.value = '';
        }
        else if (text.value.length < 5) 
        {
            text.value = text.value + e;
        }
    }

    listener(e: any) 
    {
        let char: number = e.keyCode;
        if (e.key === 'Backspace' || e.key === 'Enter' || (char > 64 && char < 91) || (char > 96 && char < 123)) 
        {
            Keys.inputKey(e.key);
        }
    };

    //endregion

    //region Html Element

    render() 
    {
        return (
            <div className={'key-box'}>
                <div className={'key-row'}>
                    <input className={'key'} type={'button'} value={'Q'} onClick={this.input} />
                    <input className={'key'} type={'button'} value={'W'} onClick={this.input} />
                    <input className={'key'} type={'button'} value={'E'} onClick={this.input} />
                    <input className={'key'} type={'button'} value={'R'} onClick={this.input} />
                    <input className={'key'} type={'button'} value={'T'} onClick={this.input} />
                    <input className={'key'} type={'button'} value={'Y'} onClick={this.input} />
                    <input className={'key'} type={'button'} value={'U'} onClick={this.input} />
                    <input className={'key'} type={'button'} value={'I'} onClick={this.input} />
                    <input className={'key'} type={'button'} value={'O'} onClick={this.input} />
                    <input className={'key'} type={'button'} value={'P'} onClick={this.input} />
                </div>
                <div className={'key-row'}>
                    <input className={'key2'} type={'button'} value={'A'} onClick={this.input} />
                    <input className={'key2'} type={'button'} value={'S'} onClick={this.input} />
                    <input className={'key2'} type={'button'} value={'D'} onClick={this.input} />
                    <input className={'key2'} type={'button'} value={'F'} onClick={this.input} />
                    <input className={'key2'} type={'button'} value={'G'} onClick={this.input} />
                    <input className={'key2'} type={'button'} value={'H'} onClick={this.input} />
                    <input className={'key2'} type={'button'} value={'J'} onClick={this.input} />
                    <input className={'key2'} type={'button'} value={'K'} onClick={this.input} />
                    <input className={'key2'} type={'button'} value={'L'} onClick={this.input} />
                </div>
                <div className={'key-row'} id={'row3'}>
                    <input className={'key3'} id={'enterKey'} type={'button'} value={'✓'} onClick={() => Keys.inputKey('Enter')} />
                    <input className={'key3'} type={'button'} value={'Z'} onClick={this.input} />
                    <input className={'key3'} type={'button'} value={'X'} onClick={this.input} />
                    <input className={'key3'} type={'button'} value={'C'} onClick={this.input} />
                    <input className={'key3'} type={'button'} value={'V'} onClick={this.input} />
                    <input className={'key3'} type={'button'} value={'B'} onClick={this.input} />
                    <input className={'key3'} type={'button'} value={'N'} onClick={this.input} />
                    <input className={'key3'} type={'button'} value={'M'} onClick={this.input} />
                    <input className={'key3'} type={'button'} value={''} id={'deleteKey'} onClick={() =>
                        Keys.inputKey('Backspace')} />
                </div>
            </div>
        );
    }

    //endregion
}

export default Keyboard;
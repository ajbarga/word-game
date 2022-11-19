// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import '../css/Keyboard.css';
import React, { Component, SyntheticEvent } from 'react';

interface KeyProps {
    getGuess(guess: string): void;
    setText(text: string[]): void;
    text: string[];
}

class Keyboard extends Component<KeyProps>
{
    //#region Non-Public Interface

    private constructor(props: any) {
        super(props);
        window.addEventListener('keydown', e => this.listener(e));
    }

    private inputKey(e: string) {
        let text: string[] = this.props.text;
        let len: number = text.indexOf('1');
        switch (e) {
            case 'Backspace':
                if (len !== 0) {
                    text[(len < 0 ? 4 : len - 1)] = '1';
                }
                break;
            case 'Enter':
                this.props.getGuess(text.join(''));
                text = ['1', '1', '1', '1', '1'];
                break;
            default:
                if (len > -1) {
                    text[len] = e;
                }
        }
        this.props.setText(text);
    }

    //#endregion

    //#region Event-Handlers

    private input(keyPress: SyntheticEvent) {
        this.inputKey((keyPress.target as HTMLInputElement).value);
        this.disable(keyPress);
    }

    private listener(e: any) {
        let char: number = e.keyCode;
        if (char === 8 || char === 13 || (char > 64 && char < 91) || (char > 96 && char < 123)) {
            this.inputKey(e.key);
        }
    };

    private async disable(e: SyntheticEvent) {
        (e.target as HTMLInputElement).disabled = true;
        await new Promise(r => setTimeout(r, 5));
        (e.target as HTMLInputElement).disabled = false;
    }

    //endregion

    //region Html Element

    render() {
        return (
            <div className={'container keyContainer'}>
                <div className={'keyRow'}>
                    <input className={'key R0'} type={'button'} value={'Q'} onClick={(k)=>this.input(k)} />
                    <input className={'key R0'} type={'button'} value={'W'} onClick={(k)=>this.input(k)} />
                    <input className={'key R0'} type={'button'} value={'E'} onClick={(k)=>this.input(k)} />
                    <input className={'key R0'} type={'button'} value={'R'} onClick={(k)=>this.input(k)} />
                    <input className={'key R0'} type={'button'} value={'T'} onClick={(k)=>this.input(k)} />
                    <input className={'key R0'} type={'button'} value={'Y'} onClick={(k)=>this.input(k)} />
                    <input className={'key R0'} type={'button'} value={'U'} onClick={(k)=>this.input(k)} />
                    <input className={'key R0'} type={'button'} value={'I'} onClick={(k)=>this.input(k)} />
                    <input className={'key R0'} type={'button'} value={'O'} onClick={(k)=>this.input(k)} />
                    <input className={'key R0'} type={'button'} value={'P'} onClick={(k)=>this.input(k)} />
                </div>
                <div className={'keyRow'}>
                    <input className={'key R1'} type={'button'} value={'A'} onClick={(k)=>this.input(k)} />
                    <input className={'key R1'} type={'button'} value={'S'} onClick={(k)=>this.input(k)} />
                    <input className={'key R1'} type={'button'} value={'D'} onClick={(k)=>this.input(k)} />
                    <input className={'key R1'} type={'button'} value={'F'} onClick={(k)=>this.input(k)} />
                    <input className={'key R1'} type={'button'} value={'G'} onClick={(k)=>this.input(k)} />
                    <input className={'key R1'} type={'button'} value={'H'} onClick={(k)=>this.input(k)} />
                    <input className={'key R1'} type={'button'} value={'J'} onClick={(k)=>this.input(k)} />
                    <input className={'key R1'} type={'button'} value={'K'} onClick={(k)=>this.input(k)} />
                    <input className={'key R1'} type={'button'} value={'L'} onClick={(k)=>this.input(k)} />
                </div>
                <div className={'keyRow'}>
                    <input className={'key EN'} type={'button'} value={'✓'} onClick={() => this.inputKey('Enter')} />
                    <input className={'key R2'} type={'button'} value={'Z'} onClick={(k)=>this.input(k)} />
                    <input className={'key R2'} type={'button'} value={'X'} onClick={(k)=>this.input(k)} />
                    <input className={'key R2'} type={'button'} value={'C'} onClick={(k)=>this.input(k)} />
                    <input className={'key R2'} type={'button'} value={'V'} onClick={(k)=>this.input(k)} />
                    <input className={'key R2'} type={'button'} value={'B'} onClick={(k)=>this.input(k)} />
                    <input className={'key R2'} type={'button'} value={'N'} onClick={(k)=>this.input(k)} />
                    <input className={'key R2'} type={'button'} value={'M'} onClick={(k)=>this.input(k)} />
                    <input className={'key DL'} type={'button'} value={'Backspace'} onClick={(k)=>this.input(k)} />
                </div>
            </div>
        );
    }

    //#endregion
}

export default Keyboard;
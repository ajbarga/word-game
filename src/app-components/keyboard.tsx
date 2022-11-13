// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import '../css/Keyboard.css';
import React, { Component } from 'react';

interface KeyProps
{
    getGuess(gs: string): void;
}

class Keyboard extends Component<KeyProps> {
    constructor(props: any)
    {
        super(props);
        window.addEventListener('keydown', e => this.listener(e));
    }

    input(e: string)
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
        let chc = e.keyCode;
        if (e.key === 'Backspace' || e.key === 'Enter' || (chc > 64 && chc < 91) || (chc > 96 && chc < 123))
        {
            this.input(e.key);
        }
    };

    render()
    {
        return (
            <div className={'key-box'}>
                <div className={'key-row'}>
                    <input className={'key'} id='keyQ' type='button' value='Q' onClick={() =>
                    {
                        this.input('Q');
                    }} />
                    <input className={'key'} id='keyW' type='button' value='W' onClick={() =>
                    {
                        this.input('W');
                    }} />
                    <input className={'key'} id='keyE' type='button' value='E' onClick={() =>
                    {
                        this.input('E');
                    }} />
                    <input className={'key'} id='keyR' type='button' value='R' onClick={() =>
                    {
                        this.input('R');
                    }} />
                    <input className={'key'} id='keyT' type='button' value='T' onClick={() =>
                    {
                        this.input('T');
                    }} />
                    <input className={'key'} id='keyY' type='button' value='Y' onClick={() =>
                    {
                        this.input('Y');
                    }} />
                    <input className={'key'} id='keyU' type='button' value='U' onClick={() =>
                    {
                        this.input('U');
                    }} />
                    <input className={'key'} id='keyI' type='button' value='I' onClick={() =>
                    {
                        this.input('I');
                    }} />
                    <input className={'key'} id='keyO' type='button' value='O' onClick={() =>
                    {
                        this.input('O');
                    }} />
                    <input className={'key'} id='keyP' type='button' value='P' onClick={() =>
                    {
                        this.input('P');
                    }} />
                </div>
                <div className={'key-row'}>
                    <input className={'key2'} id='keyA' type='button' value='A' onClick={() =>
                    {
                        this.input('A');
                    }} />
                    <input className={'key2'} id='keyS' type='button' value='S' onClick={() =>
                    {
                        this.input('S');
                    }} />
                    <input className={'key2'} id='keyD' type='button' value='D' onClick={() =>
                    {
                        this.input('D');
                    }} />
                    <input className={'key2'} id='keyF' type='button' value='F' onClick={() =>
                    {
                        this.input('F');
                    }} />
                    <input className={'key2'} id='keyG' type='button' value='G' onClick={() =>
                    {
                        this.input('G');
                    }} />
                    <input className={'key2'} id='keyH' type='button' value='H' onClick={() =>
                    {
                        this.input('H');
                    }} />
                    <input className={'key2'} id='keyJ' type='button' value='J' onClick={() =>
                    {
                        this.input('J');
                    }} />
                    <input className={'key2'} id='keyK' type='button' value='K' onClick={() =>
                    {
                        this.input('K');
                    }} />
                    <input className={'key2'} id='keyL' type='button' value='L' onClick={() =>
                    {
                        this.input('L');
                    }} />
                </div>
                <div className={'key-row'} id={'row3'}>
                    <input className={'key3'} id='special' type='button' value='✓' onClick={() =>
                    {
                        this.input('Enter');
                    }} />
                    <input className={'key3'} id='keyZ' type='button' value='Z' onClick={() =>
                    {
                        this.input('Z');
                    }} />
                    <input className={'key3'} id='keyX' type='button' value='X' onClick={() =>
                    {
                        this.input('X');
                    }} />
                    <input className={'key3'} id='keyC' type='button' value='C' onClick={() =>
                    {
                        this.input('C');
                    }} />
                    <input className={'key3'} id='keyV' type='button' value='V' onClick={() =>
                    {
                        this.input('V');
                    }} />
                    <input className={'key3'} id='keyB' type='button' value='B' onClick={() =>
                    {
                        this.input('B');
                    }} />
                    <input className={'key3'} id='keyN' type='button' value='N' onClick={() =>
                    {
                        this.input('N');
                    }} />
                    <input className={'key3'} id='keyM' type='button' value='M' onClick={() =>
                    {
                        this.input('M');
                    }} />
                    <input className={'key3'} id='special-d' type={'button'} onClick={() =>
                    {
                        this.input('Backspace');
                    }} />
                </div>
            </div>
        );
    }
}

export default Keyboard;
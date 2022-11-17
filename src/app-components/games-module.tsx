// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import React, { Component } from 'react';
import SingleGame from './guess-box';

interface GameBoxProps
{
    rowSt: string[][],
    colorState: number[][][],
    wordBox: string[],
    hintState: string;
}

class GameBox extends Component<GameBoxProps>
{
    //#region Html Element

    render ()
    {
        return (
            <div className={'gameBox'}>
                <div className={'wordBoxContainer'}>
                    <SingleGame box={this.props.rowSt[0]} colors={this.props.colorState[0]} wordBox={this.props.wordBox[0]} hintState={this.props.hintState} />
                    <SingleGame box={this.props.rowSt[1]} colors={this.props.colorState[1]} wordBox={this.props.wordBox[1]} hintState={this.props.hintState} />
                </div>
                <div className={'wordBoxContainer'}>
                    <SingleGame box={this.props.rowSt[2]} colors={this.props.colorState[2]} wordBox={this.props.wordBox[2]} hintState={this.props.hintState} />
                    <SingleGame box={this.props.rowSt[3]} colors={this.props.colorState[3]} wordBox={this.props.wordBox[3]} hintState={this.props.hintState} />
                </div>
            </div>
        );
    }

    //#endregion
}

export default GameBox;
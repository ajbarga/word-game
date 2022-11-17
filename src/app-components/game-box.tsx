// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import React, { Component } from 'react';
import SingleGuess from './single-guess';

interface GameBoxProps
{
    box: string[],
    colors: number[][];
    wordBox: string,
}

class GameBox extends Component<GameBoxProps>
{
    //#region Html Element

    render ()
    {
        return (
            <div className={'row'}>
                <SingleGuess guess={this.props.box[0]} colorState={this.props.colors[0]} />
                <SingleGuess guess={this.props.box[1]} colorState={this.props.colors[1]} />
                <SingleGuess guess={this.props.box[2]} colorState={this.props.colors[2]} />
                <SingleGuess guess={this.props.box[3]} colorState={this.props.colors[3]} />
                <SingleGuess guess={this.props.box[4]} colorState={this.props.colors[4]} />
                <SingleGuess guess={this.props.box[5]} colorState={this.props.colors[5]} />
                <SingleGuess guess={this.props.box[6]} colorState={this.props.colors[6]} />
                <SingleGuess guess={this.props.box[7]} colorState={this.props.colors[7]} />
                <SingleGuess guess={this.props.box[8]} colorState={this.props.colors[8]} />
                <div className={'container wordContainer'}>
                    <input type={'button'} className={'key'} id={'answerBox'} value={this.props.wordBox} disabled />
                </div>
            </div>

        );
    }

    //#endregion
}

export default GameBox;
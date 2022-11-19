// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import React, { Component } from 'react';
import SingleGuess from './single-guess';

interface SingleGameProps
{
    box: string[],
    colors: number[][],
    wordBox: string,
    hintState: string;
    colorMode: boolean;
}

class SingleGame extends Component<SingleGameProps>
{
    //#region Html Element

    render ()
    {
        return (
            <div className={'row'}>
                <SingleGuess guess={this.props.box[0]} colorState={this.props.colors[0]} colorMode={this.props.colorMode} />
                <SingleGuess guess={this.props.box[1]} colorState={this.props.colors[1]} colorMode={this.props.colorMode} />
                <SingleGuess guess={this.props.box[2]} colorState={this.props.colors[2]} colorMode={this.props.colorMode} />
                <SingleGuess guess={this.props.box[3]} colorState={this.props.colors[3]} colorMode={this.props.colorMode} />
                <SingleGuess guess={this.props.box[4]} colorState={this.props.colors[4]} colorMode={this.props.colorMode} />
                <SingleGuess guess={this.props.box[5]} colorState={this.props.colors[5]} colorMode={this.props.colorMode} />
                <SingleGuess guess={this.props.box[6]} colorState={this.props.colors[6]} colorMode={this.props.colorMode} />
                <SingleGuess guess={this.props.box[7]} colorState={this.props.colors[7]} colorMode={this.props.colorMode} />
                <SingleGuess guess={this.props.box[8]} colorState={this.props.colors[8]} colorMode={this.props.colorMode} />
                <div className={'container wordContainer'}>
                    <input type={'button'} className={'key'} id={'answerBox'} value={this.props.wordBox}
                        style={{ color: this.props.hintState }} disabled />
                </div>
            </div>
        );
    }

    //#endregion
}

export default SingleGame;
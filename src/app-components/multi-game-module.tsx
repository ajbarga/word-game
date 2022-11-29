// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import { Component } from 'react';
import SingleGame from './single-game-box';

interface GameBoxProps
{
    rows: string[][],
    colors: number[][][],
    suggestedWords: string[],
    hints: string;
    colorMode: boolean;
}

class GameBox extends Component<GameBoxProps>
{
    //#region Html Element

    render ()
    {
        return (
            <div id={'gameBox'}>
                <div className={'wordBox'}>
                    <SingleGame box={this.props.rows[0]} colors={this.props.colors[0]} wordBox={this.props.suggestedWords[0]} hintState={this.props.hints} colorMode={this.props.colorMode} />
                    <SingleGame box={this.props.rows[1]} colors={this.props.colors[1]} wordBox={this.props.suggestedWords[1]} hintState={this.props.hints} colorMode={this.props.colorMode} />
                </div>
                <div className={'wordBox'}>
                    <SingleGame box={this.props.rows[2]} colors={this.props.colors[2]} wordBox={this.props.suggestedWords[2]} hintState={this.props.hints} colorMode={this.props.colorMode} />
                    <SingleGame box={this.props.rows[3]} colors={this.props.colors[3]} wordBox={this.props.suggestedWords[3]} hintState={this.props.hints} colorMode={this.props.colorMode} />
                </div>
            </div>
        );
    }

    //#endregion
}

export default GameBox;
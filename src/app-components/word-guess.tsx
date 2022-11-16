// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import React, { Component } from 'react';

interface SingleGuessProps
{
    guess: string,
    colorState: number[];
}

class SingleGuess extends Component<SingleGuessProps> 
{
    //region Html Element

    render()
    {
        return (
            <div className={'container wordContainer'}>
                <p className={'letter'} id={'charColor' + this.props.colorState[0]}>{this.props.guess.charAt(0)}</p>
                <p className={'letter'} id={'charColor' + this.props.colorState[1]}>{this.props.guess.charAt(1)}</p>
                <p className={'letter'} id={'charColor' + this.props.colorState[2]}>{this.props.guess.charAt(2)}</p>
                <p className={'letter'} id={'charColor' + this.props.colorState[3]}>{this.props.guess.charAt(3)}</p>
                <p className={'letter'} id={'charColor' + this.props.colorState[4]}>{this.props.guess.charAt(4)}</p>
            </div>
        );
    }

    //endregion
}

export default SingleGuess;
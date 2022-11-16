// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import React, { Component } from 'react';
import OneBox from './game-box';

interface RowBoxProps
{
    rowSt: string[][],
    colorState: number[][][],
    wordBox: string[],
}

class RowBox extends Component<RowBoxProps> 
{
    //region Html Element

    render()
    {
        return (
            <div>
                <div id='wordBoxContainer'>
                    <OneBox box={this.props.rowSt[0]} colors={this.props.colorState[0]} wordBox={this.props.wordBox[0]} />
                    <OneBox box={this.props.rowSt[1]} colors={this.props.colorState[1]} wordBox={this.props.wordBox[1]} />
                </div>
                <div id='wordBoxContainer'>    
                    <OneBox box={this.props.rowSt[2]} colors={this.props.colorState[2]} wordBox={this.props.wordBox[2]} />
                    <OneBox box={this.props.rowSt[3]} colors={this.props.colorState[3]} wordBox={this.props.wordBox[3]} />
                </div>
            </div>
        );
    }
    
    //endregion
}

export default RowBox;
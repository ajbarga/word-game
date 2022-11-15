// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import React, { Component } from 'react';
import OneRow from './one-row';

interface OneBoxProps
{
    box: string[],
    colors: number[][];
    wordBox: string,
}

class OneBox extends Component<OneBoxProps> 
{
    //region Html Element

    render()
    {
        return (
            <div className={'row'}>
                <OneRow guess={this.props.box[0]} colorState={this.props.colors[0]} />
                <OneRow guess={this.props.box[1]} colorState={this.props.colors[1]} />
                <OneRow guess={this.props.box[2]} colorState={this.props.colors[2]} />
                <OneRow guess={this.props.box[3]} colorState={this.props.colors[3]} />
                <OneRow guess={this.props.box[4]} colorState={this.props.colors[4]} />
                <OneRow guess={this.props.box[5]} colorState={this.props.colors[5]} />
                <OneRow guess={this.props.box[6]} colorState={this.props.colors[6]} />
                <OneRow guess={this.props.box[7]} colorState={this.props.colors[7]} />
                <OneRow guess={this.props.box[8]} colorState={this.props.colors[8]} />
                <div className={'container lc'}>
                    <input type={'button'} className={'key'} id={'ans-box'} value={this.props.wordBox} disabled />
                </div>
            </div>

        );
    }

    //endregion
}

export default OneBox;
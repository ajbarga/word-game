// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import React, { Component } from 'react';

interface InputProps
{
    text: string[];
}

class InputBox extends Component<InputProps>
{
    //#region HTML Element
    render ()
    {
        return (
            <div className={'container wordContainer'} id={'input'}>
                <p className={'word letter l' + this.props.text[0]}>{this.props.text[0]}</p>
                <p className={'word letter l' + this.props.text[1]}>{this.props.text[1]}</p>
                <p className={'word letter l' + this.props.text[2]}>{this.props.text[2]}</p>
                <p className={'word letter l' + this.props.text[3]}>{this.props.text[3]}</p>
                <p className={'word letter l' + this.props.text[4]}>{this.props.text[4]}</p>
            </div>
        );
    }
    //#endregion
}
export default InputBox;
// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import React from 'react';

function getColorMode (e: boolean): string { return (e ? 'dm ' : '') + 'letter boxColor'; };

export default function SingleGuess (props: { guess: string, colorState: number[], colorMode: boolean; })
{
    let c = getColorMode(props.colorMode);

    return (
        <div className={'container wordContainer'}>
            <div className={c + props.colorState[0]}>{props.guess[0]}</div>
            <div className={c + props.colorState[1]}>{props.guess[1]}</div>
            <div className={c + props.colorState[2]}>{props.guess[2]}</div>
            <div className={c + props.colorState[3]}>{props.guess[3]}</div>
            <div className={c + props.colorState[4]}>{props.guess[4]}</div>
        </div>
    );
}

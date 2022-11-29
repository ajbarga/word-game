// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
function getClassList (e: boolean): string { return (e ? 'dm ' : '') + 'letter boxColor'; };

function Letter(p: {guess: string, classList: string})
{
    return (
        <div className={p.classList}>{p.guess}</div>
    );
}

export default function SingleGuess (props: { guess: string, colorState: number[], colorMode: boolean; })
{
    let c = getClassList(props.colorMode);

    return (
        <div className={'container wordContainer'}>
            <Letter guess={props.guess[0]} classList={c + props.colorState[0]}/>
            <Letter guess={props.guess[1]} classList={c + props.colorState[1]}/>
            <Letter guess={props.guess[2]} classList={c + props.colorState[2]}/>
            <Letter guess={props.guess[3]} classList={c + props.colorState[3]}/>
            <Letter guess={props.guess[4]} classList={c + props.colorState[4]}/>
        </div>
    );
}

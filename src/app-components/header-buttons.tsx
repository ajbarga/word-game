// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import React, { Component, SyntheticEvent } from 'react';

interface HeaderButtonProps {
    reset(): void;
    swapHintState(): void;
    hints: boolean;
}

interface HeaderButton{
    darkMode: boolean;
    hints: boolean;
    isWindowSmall: boolean;
}

let Buttons: HeaderButtons;
const SMALL: number = 501;

class HeaderButtons extends Component<HeaderButtonProps, HeaderButton>
{
    //#region Private Interface

    private constructor(props: any){
        super(props)
        Buttons = this;
        window.addEventListener('resize', ()=>{this.setState({isWindowSmall: window.innerWidth < SMALL})});

        this.state=({darkMode: false, hints: false, isWindowSmall: window.innerWidth < SMALL});
    }

    private async disable (e: SyntheticEvent)
    {
        (e.target as HTMLInputElement).disabled = true;
        await new Promise(r => setTimeout(r, 5));
        (e.target as HTMLInputElement).disabled = false;
    }

    private swapColorMode (): void
    {
        let isDarkMode: boolean = Buttons.state.darkMode;

        let divs: NodeListOf<HTMLElement> = document.querySelectorAll('input,p,div,button');
        divs.forEach(i => isDarkMode ? i.classList.remove('dm') : i.classList.add('dm'));
        document.body.style.backgroundColor = (isDarkMode ? 'thistle' : '#262626');

        Buttons.setState({ darkMode: !isDarkMode });
    };

    //#endregion

    //#region HTML Element

    render() {
        return (
            <div className={'container buttons headerBox'}>
                <input type='button' className='headerButton'
                    onClick={(e) => { this.props.reset(); this.disable(e); }}
                    value={'RESET'} />
                <input type='button' className='headerButton'
                    onClick={(e) => { this.swapColorMode(); this.disable(e); }}
                    value={(this.state.isWindowSmall ? '' : 'MODE: ') + (this.state.darkMode ? 'NIGHT' : 'DAY')} />
                <input type='button' className='headerButton'
                    onClick={(e) => { this.props.swapHintState(); this.disable(e); }}
                    value={'HINTS: ' + (this.props.hints ? 'ON' : 'OFF')} />
            </div>
        );
    }

    //#endregion
}

export default HeaderButtons;
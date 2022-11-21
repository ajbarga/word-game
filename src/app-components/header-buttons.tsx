// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import React, { Component, SyntheticEvent } from 'react';

interface HeaderButtonProps
{
    reset (): void;
    updateHintState (): void;
    swapColorMode (): void;
    isDarkMode: boolean;
    hints: boolean;
}

interface HeaderButton
{
    hints: boolean;
    isWindowSmall: boolean;
}

class HeaderButtons extends Component<HeaderButtonProps, HeaderButton>
{
    //#region Non-Public Properties / Data-Members

    private readonly SmallWindowSize = 471;

    //#endregion

    //#region Non-Public Interface

    private constructor(props: any)
    {
        super(props);
        window.addEventListener('resize', () => { this.setState({ isWindowSmall: window.innerWidth < this.SmallWindowSize }); });
        window.addEventListener('orientationchange', () => { this.setState({ isWindowSmall: window.innerWidth < this.SmallWindowSize }); });


        this.state = ({ hints: false, isWindowSmall: window.innerWidth < this.SmallWindowSize });
    }

    private async disable (e: SyntheticEvent)
    {
        (e.target as HTMLInputElement).disabled = true;
        await new Promise(r => setTimeout(r, 5));
        (e.target as HTMLInputElement).disabled = false;
    }

    //#endregion

    //#region HTML Element

    render ()
    {
        return (
            <div className={'container buttons headerBox'}>
                <input type='button' className='headerButton'
                    onClick={(e) => { this.props.reset(); this.disable(e); }}
                    value={'RESET'} />
                <input type='button' className='headerButton'
                    onClick={(e) => { this.props.swapColorMode(); this.disable(e); }}
                    value={(this.state.isWindowSmall ? '' : 'MODE: ') + (this.props.isDarkMode ? 'NIGHT' : 'DAY')} />
                <input type='button' className='headerButton'
                    onClick={(e) => { this.props.updateHintState(); this.disable(e); }}
                    value={(this.state.isWindowSmall ? '' : 'HINTS: ') + (this.props.hints ? 'ON' : 'OFF')} />
            </div>
        );
    }

    //#endregion
}

export default HeaderButtons;
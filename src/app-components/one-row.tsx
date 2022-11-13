// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import React, {Component} from "react";

interface RowProps {
    guess: string,
    colorState: number[]
}

class OneRow extends Component<RowProps> {

    render() {
        return (
            <div className={"container lc"}>
                <p className={"letter"} id={"l" + this.props.colorState[0]}>{this.props.guess.charAt(0)}</p>
                <p className={"letter"} id={"l" + this.props.colorState[1]}>{this.props.guess.charAt(1)}</p>
                <p className={"letter"} id={"l" + this.props.colorState[2]}>{this.props.guess.charAt(2)}</p>
                <p className={"letter"} id={"l" + this.props.colorState[3]}>{this.props.guess.charAt(3)}</p>
                <p className={"letter"} id={"l" + this.props.colorState[4]}>{this.props.guess.charAt(4)}</p>
            </div>
        )
    }
}

export default OneRow;
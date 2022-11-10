// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import React, {Component} from "react";

interface RowProps {
    gString: any,
}

class OneRow extends Component<RowProps> {

    render() {
        return (
            <div className={"container lc"}>
                <p className={"letter"} id={"l-" + this.props.gString[0]}>{this.props.gString[1]}</p>
                <p className={"letter"} id={"l-" + this.props.gString[2]}>{this.props.gString[3]}</p>
                <p className={"letter"} id={"l-" + this.props.gString[4]}>{this.props.gString[5]}</p>
                <p className={"letter"} id={"l-" + this.props.gString[6]}>{this.props.gString[7]}</p>
                <p className={"letter"} id={"l-" + this.props.gString[8]}>{this.props.gString[9]}</p>
            </div>
        )
    }
}

export default OneRow;
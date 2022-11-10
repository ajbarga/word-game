// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import React, {Component} from "react";
import OneBox from './one-box';

interface RowBoxProps {
    rowSt: [[any], [any], [any], [any]],
    wordBox: [string, string, string, string],
}

class RowBox extends Component<RowBoxProps> {

    render() {
        return (
            <div>
                <OneBox box={this.props.rowSt[0]} wordBox={this.props.wordBox[0]}/>
                <OneBox box={this.props.rowSt[1]} wordBox={this.props.wordBox[1]}/>
                <OneBox box={this.props.rowSt[2]} wordBox={this.props.wordBox[2]}/>
                <OneBox box={this.props.rowSt[3]} wordBox={this.props.wordBox[3]}/>
            </div>
        );
    }
}

export default RowBox;
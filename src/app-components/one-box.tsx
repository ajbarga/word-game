// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import React, {Component} from "react";
import OneRow from './one-row';

interface OneBoxProps {
    box: any,
    wordBox: string,
}

class OneBox extends Component<OneBoxProps> {

    makeRow(guess: string) {
        return guess.split('');
    }

    render() {
        return (
            <div className={"row"}>
                <OneRow gString={this.makeRow(this.props.box[0])}/>
                <OneRow gString={this.makeRow(this.props.box[1])}/>
                <OneRow gString={this.makeRow(this.props.box[2])}/>
                <OneRow gString={this.makeRow(this.props.box[3])}/>
                <OneRow gString={this.makeRow(this.props.box[4])}/>
                <OneRow gString={this.makeRow(this.props.box[5])}/>
                <OneRow gString={this.makeRow(this.props.box[6])}/>
                <OneRow gString={this.makeRow(this.props.box[7])}/>
                <OneRow gString={this.makeRow(this.props.box[8])}/>
                <div className={"container lc"}>
                    <input type={"button"} className={"key"} id={"ans-box"} value={this.props.wordBox} disabled/>
                </div>
            </div>

        );
    }
}

export default OneBox;
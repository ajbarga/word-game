// © 2022 Alex Barga. All rights reserved.
// Reproduction or transmission in whole or in part, in any form or by any means, electronic,
// mechanical or otherwise, is prohibited without the prior  written consent of the owner.
import "./css/App.css";

import React, {Component} from "react";
import RowBox from "./app-components/row-box";
import Keyboard from "./app-components/keyboard";
import GameDriver from "./GameDriver";

interface Quordle {
    rows: any;
    wordList: any;
}

const q: string = "w w w w w ";
let num: any = [0, 0, 0, 0];
let help = true;
let darkMode = true;
let titleColor: string = "tB";
let rows: any = [[], [], [], []];
let wordList: any = ["", "", "", ""];

class App extends Component<{}, Quordle> {
    private gameDriver: GameDriver = new GameDriver();

    constructor(props: Quordle) 
    {
        super(props);
        for (let i = 0; i < 4; i++)
        {
            for (let j = 0; j < 9; j++)
            {
                rows[i][j] = q;
            }
        }
        this.state = ({rows: rows, wordList: wordList});
    }

    makeGuess = async(guessVal: string) => 
    {
        let text = this.gameDriver.guess(guessVal.toUpperCase());
        if(text[0].length == 0)
        {
            titleColor = 'rTB';
            this.forceUpdate();
            await this.timeout(1500);
            titleColor = 'tB';
        }
        else
        {
            for (let i = 0; i < 4; i++) 
            {
                if (num[i] < 9) 
                {
                    if (text[i].length === 15) 
                    {
                        rows[i][num[i]] = text[i].substring(0, 10);
                        num[i]++;
                    } 
                    else 
                    {
                        await this.analyzeGuess(text[i], i);
                        rows[i][num[i]] = text[i];
                        if (text[i].length > 12) 
                        {
                            num[i] = 8;
                        }
                        num[i]++;
                        if (text[i].length > 12) 
                        {
                            wordList[i] = "Nice Job! :)";
                        }
                    }
                }
            }
        }
        this.forceUpdate();
    };

    analyzeGuess = async (val: string, num: number) => 
    {
        // try {
        //     let response = await fetch("http://localhost:4567/analyze?num=" + num + "&guess=" + val);
        //     if (!response.ok) {
        //         alert("The status is wrong! Expected: 200, Was: " + response.status);
        //         return; // Don't keep trying to execute if the response is bad.
        //     }
        //     let text = await response.json();
        //     wordList[num] = text.substring(1, text.length - 1);
        // } catch (e) {
        //     alert("There was an error contacting the server.");
        //     console.log(e);
        //     this.forceUpdate();
        // }
    };

    reset()
    {
        for (let i = 0; i < 4; i++)
        {
            for (let j = 0; j < 9; j++)
            {
                rows[i][j] = q;
            }
        }
        num = [0, 0, 0, 0];
        wordList = ["", "", "", ""];

        titleColor = 'tB';

        (document.getElementById('wordBox') as HTMLInputElement).value = '';

        this.gameDriver.reset();
        this.forceUpdate();
    };

    swapHelper() 
    {
        let all = document.querySelectorAll("#ans-box");
        for (let i = 0; i < all.length; i++)
        {
            (all.item(i) as HTMLButtonElement).style.textIndent = (help ? "0px" : "-9999px");
        }
        help = !help;
    };

    swapMode()
    {
        document.body.style.backgroundColor = (darkMode ? "#262626" : "thistle");
        let all = document.querySelectorAll("input,p,div.container,div.key-box,button");
        for (let i = 0; i < all.length; i++) 
        {
            if (darkMode)
            {
                all.item(i).classList.add("dm");
            }
            else
            {
                all.item(i).classList.remove("dm");
            }
        }
        darkMode = !darkMode;
    }

    timeout(delay: number) 
    {
        return new Promise(res => setTimeout(res, delay));
    };

    render() 
    {
        return (
            <div className={"big-box"}>
                <div className={"container tc"} id={"short"}>
                    <button onClick={this.reset}>RESET</button>
                    <button onClick={this.swapMode}>SWAP</button>
                    <button onClick={this.swapHelper}>HELP</button>
                </div>
                <div className={"container"}>
                    <p className={"title-box"} id={titleColor}>Wordle</p>
                </div>
                <RowBox rowSt={this.state.rows} wordBox={wordList}/>
                <div className={"container wc"}>
                    <input disabled={true} className={"word"} id={"wordBox"} type="text" maxLength={5}/>
                </div>
                <div className={"container"} id={"keyCont"}>
                    <Keyboard getGuess={(g1: string) => this.makeGuess(g1)}/>
                </div>
            </div>
        );
    }
}

export default App;

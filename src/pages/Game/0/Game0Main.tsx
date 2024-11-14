import React, {Component, useEffect, useState} from "react";
import {GameProps} from "../GameProps/GameProps";

import Tutorial from "./Tutorial";
import Submit from "./submit/Submit";
import Check from "./check/Check";
import Show from "./show/Show";
import Play from "./play/Play";
import Result from "./result/Result";
import Ranking from "./ranking/Ranking";
import Done from "./Done";
import {Submission} from "./Submission";

export const Stages = {
    0: null,
    1: null,
    2: Tutorial,
    3: Submit,
    4: Check,
    5: Show,
    6: Play,
    7: Result,
    8: Ranking,
    9: Done,
}

export default function Game0(props : GameProps) {

    const [target, setTarget] = useState<Submission>();

    const submissionCallBack = ((submission : Submission)=>{
        setTarget(submission);
    })

    console.log("GAME 0 Stage : "+props.stage);
    useEffect( ()=>{

    },[])
    return (
        <div className="Game0">
            {Object.entries(Stages).map(([index, stageComponent]) =>{
                if (props.stage == Number(index) && stageComponent != null){
                    const Component = stageComponent;
                    // @ts-ignore
                    return (
                        <div key={index}>
                            <Component memberId={props.memberId} callback={submissionCallBack} target={target}/>
                        </div>
                    );
                }
            })}

        </div>
    );
}
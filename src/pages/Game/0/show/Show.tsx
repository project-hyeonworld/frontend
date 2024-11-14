import React, {useEffect, useState} from "react";
import {GameStageProps} from "../../GameProps/GameProps";
import {Submission} from "../Submission";
import {ShowAPI} from "./ShowAPI";

export default function Show(props : GameStageProps) {

    const [displaySubmission, setSubmission] = useState<Submission>();

    const getSubmission = (submission : Submission)=>{
        console.log("ff");
        setSubmission(submission);
        props.callback(submission);
    }



    useEffect(()=>{
        ShowAPI(getSubmission);
    },[])

    return (
        <div className="Game0">

            <h3>{displaySubmission?.name}님의 명제</h3>
            {
                displaySubmission?.textList?.map ((text, index)=>{
                    return (
                            <div key={index}>
                                <p >{text}</p>
                                <ul className={"p-4"}></ul>
                            </div>
                            )
                })
            }

        </div>
    );
}
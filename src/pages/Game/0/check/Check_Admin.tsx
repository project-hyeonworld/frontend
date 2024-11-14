import React, {useEffect, useState} from "react";
import {CheckAPI, CheckTargetAPI} from "./CheckAPI";
import {SubmissionAdmin} from "../Submission";
import './Check_Admin.css'
import Accordion from "../../../../parts/accordion/Accordion";

export default function Check_Admin () {

    const [submissionList, setPlayer] = useState<SubmissionAdmin[]> ([]);
    const [target, setTarget] = useState <string> ("");
    const [buttonColor, setButtonColor] = useState('bg-red-500');

    const getPlayer = (submissions : SubmissionAdmin[])=>{
        setPlayer(submissions);
    }

    useEffect(()=>{
        CheckAPI(getPlayer);
    },[])

    const onConfirm = ()=>{

        function getResponse(){
            if (buttonColor == 'bg-red-500'){
                setButtonColor('bg-green-500');
            }

            else {
                setButtonColor('bg-red-500');
            }
        }

        CheckTargetAPI(getResponse, target);

    };

    const handleSubmission = (index : number) => {
        setTarget(submissionList[index].name);
    };

    return(
        <div className={"Check_Admin"}>
            <button className={`mb-2 justify-between items-center p-2 rounded-2xl ${buttonColor}`} onClick={()=>onConfirm()}>{target}</button>
            {submissionList.map((submission: SubmissionAdmin, i: number) => {
                return (
                    <div onClick={(event)=>handleSubmission(i)} key={i}>
                        <Accordion  title={submission.name+(submission.number+1)} content={submission.textList}/>
                        <ul className={"py-2"}></ul>
                    </div>
                )
            })}

        </div>
    )

}
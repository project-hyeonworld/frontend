import React, {useEffect, useState} from "react";
import {CheckAPI, CheckTargetAPIAxios} from "../../CheckAPI";
import './Check_Admin.css'
import Accordion from "view/parts/accordion/Accordion";
import {usePartyContext} from "context/party/PartyContext";
import {useAdminContext} from "context/admin/AdminContext";
import {useGameContext} from "context/game/GameContext";


export default function Check_Admin () {

    const adminContext = useAdminContext("Check_Admin");
    const partyContext = usePartyContext("Check_Admin");
    const gameContext = useGameContext("Check_Admin");

    const [submissionList, setPlayer] = useState<Submission[]> ([]);
    const [targetName, setTargetName] = useState <string> ("");
    const [targetUserId, setTargetUserId] = useState<number>();
    const [buttonColor, setButtonColor] = useState('bg-red-500');

    const {partyId} = partyContext;
    const {roundId} = adminContext;
    const {gameId} = gameContext;
    const getPlayer = (submissions : Submission[])=>{
        setPlayer(submissions);
    }
    useEffect(()=>{
        CheckAPI(partyId,roundId, getPlayer);
    },[])

    const onCommit = ()=>{
        const getResponse = () => {
            if (buttonColor == 'bg-red-500'){
                setButtonColor('bg-green-500');
                return;
            }
            setButtonColor('bg-red-500');
        }
        if (targetUserId !== null) {
            console.log("Check_ADMNI"+targetUserId);
            CheckTargetAPIAxios(partyId, roundId, gameId, targetUserId, getResponse);
        }

    };

    const handleSubmission = (index : number) => {
        setTargetName(submissionList[index].name);
        setTargetUserId(submissionList[index].userId);
    };

    return(
        <div className={"Check_Admin"}>
            <button className={`mb-2 justify-between items-center p-2 rounded-2xl ${buttonColor}`} onClick={()=>onCommit()}>{targetName}</button>
            {submissionList.map((submission: Submission, i: number) => {
                return (
                    <div onClick={(event)=>handleSubmission(i)} key={i}>
                        <Accordion title={submission.name} content={submission.texts} answer={submission.number}/>
                        <ul className={"py-2"}></ul>
                    </div>
                )
            })}

        </div>
    )

}
import React, {useEffect, useState} from "react";
import {PlayAPI} from "./PlayAPI";
import {usePartyContext} from "context/party/PartyContext";
import {ShowAPI} from "../show/ShowAPI";


const Play = () => {

    const partyContext = usePartyContext("Play");
    const {partyId, userId, content, setContent} = partyContext;

    const [playConfirm, setConfirm] = useState (false);
    const [completed, setCompleted] = useState<string>("거짓을 선택해 주세요.");
    const [answer, setAnswer] = useState<number>();
    const [tmpContent, setTmpCotent] = useState<string[]>();

    useEffect(()=>{
        if (!content) {
            ShowAPI(partyId, handleContent);
        }
        setTmpCotent(content?.split("<br />").slice(1, -1));
    },[content])

    const handleContent = (submission: string) => {
        setContent(submission);
    }


    const onCommit = (index: number)=>{
        setAnswer(index);
        PlayAPI(partyId, userId, index);
    };

    const onConfirm = (val : boolean)=>{
        if (val) {
            console.log("FFF");
            //PlayAPI(userId, button);
            setCompleted("선택을 완료하셨습니다.")
        }
        setConfirm(!playConfirm);
    }

    return (
        <div className="Game0">
            <p>{completed}</p>
            {tmpContent && tmpContent.map((text, index)=>(
                <div key={index}>
                    <button className={`mb-2 justify-between items-center p-2 rounded-2xl + ${answer === index ? 'bg-red-500' : 'bg-sky-500'}`} onClick={()=>onCommit(index)}>{text}</button>
                </div>
            ))}
        </div>
    );
}

export default Play;
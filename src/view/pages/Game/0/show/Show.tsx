import React, {useEffect, useState} from "react";
import {GameStageProps} from "../../GameProps/GameProps";
import {ShowAPI} from "./ShowAPI";
import {usePartyContext} from "../../../../../context/party/PartyContext";


export default function Show(props : GameStageProps) {

    const partyContext = usePartyContext("Show");
    const [content, setContent] = useState<string>();

    const handleContent = (submission : string)=>{
        console.log("ff");
        console.log(submission);
        setContent(submission);
    }

    const {partyId} = partyContext;

    useEffect(()=>{
        ShowAPI(partyId, handleContent);
    },[])

    const formatContent = (content: string | undefined) => {
        return content?.split("<br />").map((line, index) => (
            <div key={index}>{line}</div>
        ));
    };

    return (
        <div className="Game0">
            {formatContent(content)}
        </div>
    );
}
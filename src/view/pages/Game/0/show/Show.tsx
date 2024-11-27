import React, {useEffect} from "react";
import {GameStageProps} from "../../GameProps/GameProps";
import {ShowAPI} from "./ShowAPI";
import {usePartyContext} from "../../../../../context/party/PartyContext";


export default function Show(props : GameStageProps) {

    const partyContext = usePartyContext("Show");

    const handleContent = (submission : string)=>{
        setContent(submission);
    }

    const {partyId, content, setContent} = partyContext;

    useEffect(()=>{
        ShowAPI(partyId, handleContent);
    },[])

    const formatContent = (inputContent: string | undefined): React.JSX.Element[] | undefined => {
        return inputContent?.split("<br />").map((line, index) => (
            <div key={index}>{line}</div>
        ));
    };


    return (
        <div className="Game0">
            {formatContent(content)}
        </div>
    );
}
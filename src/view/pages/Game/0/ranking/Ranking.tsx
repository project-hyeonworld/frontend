import React, {useEffect, useState} from "react";
import {RankingAPI} from "./RankingAPI";
import {usePartyContext} from "../../../../../context/party/PartyContext";
import {ParticipantWithName} from "../../../../../model/Participant";

export default function Ranking (){
    const partyContext = usePartyContext("Ranking");
    const [participants, setParticipants] = useState<ParticipantWithName[]>();

    const {partyId} = partyContext;

    useEffect(()=>{
        RankingAPI(partyId, handleRanking);
    },[])

    const handleRanking = ((participants : ParticipantWithName[])=>{
        setParticipants(participants);
    })

    const Chart = ()=>{


    }

    let rank : number = 0;
    let prevScore : number = 0;

    return (
        <div className="Game0">

            <p>랭킹</p>
            {

                participants?.map((participant : ParticipantWithName)=>{
                    return (
                        <div key={participant.name} className={"grid grid-cols-3"}>
                            <p>{prevScore == participant.score ? (rank)  : (++rank)}위</p>
                            <p>{participant.name}</p>
                            <p>{participant.score}</p>
                        </div>
                    )
                })
            }
        </div>
    );
}
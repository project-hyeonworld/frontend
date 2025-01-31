import React, {useEffect, useState} from "react";
import {RankingAPI} from "view/pages/Game/0/ranking/RankingAPI";
import {usePartyContext} from "../../../../context/party/PartyContext";

interface ScoreModalProps{
    onClose : any;
}

interface Participant {
    name: string,
    score: number,
}

const ScoreModal = (props: ScoreModalProps) => {
    const partyContext = usePartyContext("Scoremodal");
    const [participants, setParticipants] = useState<Participant[]>();

    const {partyId} = partyContext;

    const handleParticipants = ((memberList : Participant[])=>{
        setParticipants(memberList);
    })

    useEffect(()=>{
        RankingAPI(partyId, handleParticipants);
    },[])

    let rank : number = 0;
    let prevScore : number = 0;

    return (
        <div className={"h-screen w-full fixed left-0 top-0 flex justify-center bg-black bg-opacity-70"}>
            <div className={"py-2 px-4 bg-white fixed bottom-1/3 rounded-2xl w-10/12 h-1000"} key={12}>

                {participants?.map((participant : Participant)=>{
                return (
                <div key={participant.name} className={"grid grid-cols-3"}>
                <p>{prevScore === participant.score ? (rank)  : (++rank)}위</p>
                <p>{participant.name}</p>
                <p>{participant.name}</p>
            </div>
            )
            })}
                <button onClick={props.onClose} className={"py-2 px-4 bg-gray-600 hover:bg-gray-700 rounded-2xl text-white"}>확인</button>
            </div>
        </div>
    )
}
export default ScoreModal;
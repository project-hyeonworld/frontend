import React, {ChangeEvent, useEffect, useState} from "react";
import {ResultAPI, SetScoreAxios} from "./ResultAPI";
import {Special} from "configuration/special/SpecialConfig";
import {usePartyContext} from "context/party/PartyContext";
import {useAdminContext} from "context/admin/AdminContext";

export interface ParticipantBasic {
    id: number;
    score: number;
}

export interface ParticipantWithName extends ParticipantBasic{
    name: string;
}

export default function  Result() {
    const partyContext = usePartyContext("Result");
    const {partyId, userId, content} = partyContext;
    const adminContext = useAdminContext("Result");
    const {roundId} = adminContext;
    const [correct, setCorrect] = useState<number>(2);
    const [wrong, setWrong] = useState<number>(0);
    const [display, setDisplay] = useState<string[]>();
    const [answer, setAnswer] = useState<number>();
    const [participants, setParticipants] = useState<ParticipantWithName[]>();

    const special = new Special();

    useEffect(()=>{
        ResultAPI(partyId, handleResult);
    },[])

    const handleResult = ((answer:string, participants : ParticipantWithName[])=>{
        console.log("RESULT");
        console.log(participants);
        handleDisplay(answer);
        setParticipants(participants);
    })

    const handleDisplay = (answer: string) => {
        console.log("DISPLAY"+answer);
        const numericAnswer =  parseInt(String(answer), 10);
        setAnswer(numericAnswer);
        console.log("DISPLAY"+numericAnswer);
        setDisplay(content?.split("<br />").slice(1, -1));
    }


    const handleCorrect = (event : ChangeEvent<HTMLInputElement>) => {
        setCorrect(Number(event.target.value));
    }

    const handleWrong = (event : ChangeEvent<HTMLInputElement>) => {
        setWrong(Number(event.target.value));
    }

    const handleScore = (participants: ParticipantWithName[] | undefined, numericScore: number) => {
        if (!participants) return;
        const updatedParticipants = participants.map(participant => ({
            ...participant,
            score: participant.score + numericScore
        }));
        setParticipants(updatedParticipants);
    };

    const oninit = () => {
        setCorrect (2);
        setWrong (0);
    }


    const onSetCorrect = () =>{
        handleScore(participants, correct);
        const basicParticipants = convertToParticipantBasic(participants);
        if (roundId) {
            SetScoreAxios(partyId, roundId, basicParticipants, correct);
        }

        oninit();
    }

    const onSetWrong = () =>{
        const basicParticipants = convertToParticipantBasic(participants);
        if (roundId) {
            SetScoreAxios(partyId, roundId, basicParticipants, wrong);
        }
        oninit();
    }

    const convertToParticipantBasic = (participants: ParticipantWithName[] | undefined): ParticipantBasic[] => {
        if (!participants) return []; // Return an empty array if participants is undefined
        return participants.map(participant => ({
            id: participant.id,
            score: participant.score
        }));
    };





    return (
        <div className="Game0">
            <div className={"grid grid-cols-3"}>
                <div className={"ScoreSetting"}>
                    {userId == special.adminId && <div>
                        <input className={"text-center w-40"} type={"text"} value={correct} onChange={handleCorrect}></input>
                        <input id="default-range" type="range" min="1" max="100" step={"1"} onChange={handleCorrect} value={correct}
                               className="w-70 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                        <button  className={"bg-red-600 hover:bg-red-700 rounded text-white mx-2"} onClick={onSetCorrect}>확인</button>
                    </div>}


                    {/* Add any other input fields or buttons as needed */}
                </div>
                <div className={"grid grid-rows-2"}>
                    <div>
                        {display && display.map((text, index) => (
                            <div key={index}>
                                <button
                                    className={`mb-2 justify-between items-center p-2 rounded-2xl + ${answer === index ? 'bg-red-500' : 'bg-sky-500'}`}>{text}</button>
                            </div>
                        ))}
                    </div>
                    <div>
                        <p>맞추신 분 :</p>
                        {participants?.map((participant, index) => {
                            return (
                                <div key={index} className="grid grid-cols-2">
                                    <p>{participant.name}</p>
                                    <input value={participant.score} className="border rounded p-0.5 w-16"></input>
                            <ul className={"p-4"}></ul>
                        </div>
                        )
                        })}
                    </div>
                </div>
                <div className={"Wrong"}>
                    {userId == special.adminId && <div>
                        <input className={"text-center w-40"} type={"text"} value={wrong} onChange={handleWrong}></input>
                        <input id="default-range" type="range" min="-45" max="100" step={"1"} onChange={handleWrong} value={wrong}
                               className="w-70 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                        <button  className={"bg-blue-600 hover:bg-red-700 rounded text-white mx-2"} onClick={onSetWrong}>확인</button>
                    </div>}
                </div>

            </div>

        </div>
    );
}
import {My} from "configuration/web/WebConfig";
import axios from "axios";
import {Special} from "configuration/special/SpecialConfig";
import {ParticipantBasic, ParticipantWithName} from "./Result";

interface rawParticipant {
    id: number,
    name: string
}

const my = new My();
const special = new Special();

export function ResultAPI(partyId: number, handleResult: (answer:string, nameList: ParticipantWithName[]) => void) {
    axios({
        url: "/api/v2/parties/" + partyId + "/rounds/results",
        method: 'get',
        baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
        withCredentials: true,
    }).then(function (response) {
        console.log("APIO");
        console.log(response);
        const dataList = response.data.winners.nameDtos;
        const participants: ParticipantWithName[] = Object.keys(dataList).length === 0 ?
            [] :
            Object.entries(dataList).map(([_, participant]) => {
            const {id, name} = participant as rawParticipant;
            return {
                id,
                name,
                score: 0
            };
        });
        handleResult(response.data.answer, participants);
    });
};

export function SetScoreAxios(partyId: number, roundId: number, participants : ParticipantBasic[], score : number) {


    axios({
        url: "/api/v2/parties/" + partyId + "/rounds/" + roundId + "/result-confirm",
        method: 'post',
        baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
        withCredentials: true,
        data : {
            participants: participants,
            score: score
        }

    }).then(function (response) {
        //console.log("aa"+response.data);
        //console.log(response.data.keys()); //Array Iterator()

        //const stringArray : string[] = Array.from (Object.values(response.data));

        //getNameList(response.data);
    });
};
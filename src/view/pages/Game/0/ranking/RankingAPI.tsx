import {My} from "configuration/web/WebConfig";
import {Special} from "configuration/special/SpecialConfig";
import axios from "axios";
import {ParticipantWithName} from "model/Participant";

interface rawParticipant {
    name: string,
    score: number
}

export function RankingAPI(partyId: number, getList : any) {
    const my = new My();
    const special = new Special();
    axios({
        url: "/api/v2/parties/" + partyId + "/rankings",
        method: 'get',
        baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
        withCredentials: true,
    }).then(function (response) {
        console.log(response);
        console.log(response.headers);
        console.log(response.data); //
        const dataList = response.data.rank;
        const participants : ParticipantWithName[] = Array.from(dataList).length === 0 ?
        [] :
            Object.entries(dataList).map(([_, participant], index) => {
                const {name, score} = participant as rawParticipant;
                return {
                    id : index,
                    name,
                    score
                }
            });
        getList(participants);
    });


};
import {My} from "configuration/web/WebConfig";
import {Special} from "configuration/special/SpecialConfig";
import axios from "axios"

export function CheckTargetAPIAxios(partyId: number, roundId: number|null, gameId: number|null, targetId: number|undefined, getResponse: ()=> void) {
    const my = new My();


    axios({
        url: "/api/v2/parties/"+ partyId + "/rounds/"+ roundId + "/check-confirm",
        method: 'patch',
        baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
        withCredentials: true,
        data: {
            gameId: gameId,
            targetId: targetId,
        }
    })
};

interface rawSubmission {
    userId: number;
    name: string;
    text: string;
    number: number;
}

export function CheckAPI(partyId: number, roundId:number|null, handleEntry: (submissions: Submission[]) => void) {
    const my = new My();
    const special = new Special();

    axios({
        url: "/api/v2/parties/"+ partyId + "/rounds/"+ roundId + "/checks",
        method: 'get',
        baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
        withCredentials: true,
    }).then(function (response) {
        const dataList = response.data;
        const submissions: Submission[] = Object.entries(dataList).map(([_, submission]) => {
            const {userId, name, text, number } = submission as rawSubmission;

            return {
                userId,
                name,
                texts: text.split(','),
                number,
            };
        });
        handleEntry(submissions);
    });
};
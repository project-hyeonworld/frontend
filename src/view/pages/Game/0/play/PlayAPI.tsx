import {My} from "configuration/web/WebConfig";
import axios from "axios";

export function PlayAPI(partyId: number, userId: number, answer: number) {
    const my = new My();

    axios({
        url: "/api/v2/parties/"+ partyId + "/rounds/plays",
        method: 'patch',
        baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
        withCredentials: true,
        data: {
            userId: userId,
            answer: answer.toString(),
        }
    }).then(function (response) {

    });
};
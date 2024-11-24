import {My} from "configuration/web/WebConfig";
import axios from "axios"

export function SubmitAPI(partyId: number, userId : number, onSend: (val: boolean) => void, input: string[], inputFalse: number) {
    const my = new My();

    axios({
        url: "/api/v2/parties/" + partyId + "/rounds/" + "submits",
        method: 'post',
        baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
        withCredentials: true,
        data: {
            userId: userId,
            text: input.join(","),
            number : inputFalse,
        }
    }).then(function (response) {
        onSend(response.data);
    });
};
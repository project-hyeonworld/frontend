import {My} from "configuration/web/WebConfig";
import axios from "axios"

export function SubmitAPI(partyId: number, userId : number, onSend: (val: boolean) => void, input: string[], inputFalse: number) {
    const my = new My();

    axios({
        url: "/api/v2/rounds/" + "submits",
        method: 'post',
        baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
        withCredentials: true,
        data: {
            partyId: partyId,
            userId: userId,
            text: input.join(","),
            number : inputFalse,
        }
    }).then(function (response) {
        onSend(response.data);
    });
};
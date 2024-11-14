import {My} from "../../../../configuration/web/WebConfig";
import axios from "axios"

export function SubmitAPI(memberId : number, onSend: (val: boolean) => void, input: string[], inputFalse: number) {
    const my = new My();

    axios({
        url: "submission/0",
        method: 'post',
        baseURL: `http://${my.ipAddress}:${my.backEndPort}`,
        withCredentials: true,
        data: {
            memberId: memberId,
            input: input.join(","),
            inputFalse : inputFalse,
        }
    }).then(function (response) {
        onSend(response.data);
    });
};
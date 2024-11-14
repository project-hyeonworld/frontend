import {My} from "../../../../configuration/web/WebConfig";
import axios from "axios";

export function PlayAPI(memberId: number, answer: number | undefined) {
    const my = new My();

    axios({
        url: "member/play/0",
        method: 'put',
        baseURL: `http://${my.ipAddress}:${my.backEndPort}`,
        withCredentials: true,
        data: {
            memberId: memberId,
            answer: answer,
        }
    }).then(function (response) {

    });
};
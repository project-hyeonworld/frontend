import {My} from "../../configuration/web/WebConfig";

import axios from "axios";

export function AdminMenuAxios(stage : number) {
    const my = new My();
    axios({
        url: "/api/game-stage",
        method: 'put',
        baseURL: `http://${my.ipAddress}:${my.backEndPort}`,
        withCredentials: true,
        params: {
            currentStage: stage
        }
    }).then(function (response) {
    });
};

export function AdminDoneAxios() {
    const my = new My();
    axios({
        url: "/member/init",
        method: 'put',
        baseURL: `http://${my.ipAddress}:${my.backEndPort}`,
        withCredentials: true,
    });
};
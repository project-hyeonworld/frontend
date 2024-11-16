import {My} from "../../../configuration/web/WebConfig";

import axios from "axios";

export function OpenGameAxios(partyId : number, gameId : number) {
    const my = new My();

    const changeDashboardData = {
        gameId: gameId,
        gameStage: 1
    };

    axios({
        url: "/api/v2/parties/" + partyId + "/dashboard",
        method: 'patch',
        baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
        withCredentials: true,
        data: changeDashboardData
    }).then(function (response) {
    });
};
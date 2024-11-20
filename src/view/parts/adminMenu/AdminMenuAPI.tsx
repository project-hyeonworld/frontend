import {My} from "configuration/web/WebConfig";
import axios from "axios";

export function AdminMenuAxios(partyId : number, game : number, stage : number) {
    const my = new My();

    const changeDashboardData = {
        gameId: game,
        gameStage: stage
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

export function ChangeCurrentGameStageAxios(partyId : number, gameStage : number) {
    const my = new My();

    axios({
        url: "/api/v2/parties/" + partyId + "/dashboard/gameStage",
        method: 'patch',
        baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
        withCredentials: true,
        data: {
            gameStage: gameStage
        }
    }).then(function (response) {
    });
};

export function AdminDoneAxios() {
    const my = new My();
    axios({
        url: "/member/init",
        method: 'put',
        baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
        withCredentials: true,
    });
};
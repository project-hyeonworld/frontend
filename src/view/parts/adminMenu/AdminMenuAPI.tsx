import {My} from "configuration/web/WebConfig";
import axios from "axios";

const my = new My();

export function GetRelationTypeAxios(handleRelationList : (list : any) => void) {
    axios({
        url: "/api/v2/users/relation-types",
        method: 'get',
        baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
        withCredentials: true,
    }).then(function (response) {
        handleRelationList(response.data.relationTypes);
    });
}

export function AdminMenuAxios(partyId : number, game : number, stage : number) {

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
    axios({
        url: "/member/init",
        method: 'put',
        baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
        withCredentials: true,
    });
};
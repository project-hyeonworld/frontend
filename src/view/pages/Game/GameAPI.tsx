import {My} from "../../../configuration/web/WebConfig";
import axios from "axios"

const my = new My();

export function EnterGameAxios(partyId: number, userId: number) {
    console.log("SEND ENTER GAME AXIOS")
    return axios({
        url: "/api/v2/auth/session" + "/game",
        method: 'post',
        baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
        withCredentials: true,
        data : {
            partyId: partyId,
            userId : userId,
        }
    });
}

export function ExitGameAxios(userId: number) {
    axios({
        url: "/api/v2/auth/session" + "/game",
        method: 'delete',
        baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
        withCredentials: true,
        data : {
            userId : userId,
        }
    }).then(function (response) {
        console.log("결과");
        console.log("EXIt :"+response.data);
    });
};

export function GetGameStageListenerAxios(partyId: number, userId: number, handleChangeCurrentStage : (gameStage : number) => void) {

    console.log("STAGEEEE")
    let eventSource : EventSource;
    eventSource = new EventSource('http://'+my.backendIpAddress+":"+my.backEndPort+`/api/v2/sse/${partyId}/game-stage?userId=${userId}`);

    eventSource.addEventListener('connect', (e)=>{
        const {data: receivedConnectData} = e;
        console.log('connect event data101 : ',receivedConnectData);
    });
    eventSource.addEventListener('open', () => {
        console.log('Connection established.');
    });
    eventSource.addEventListener('ChangeCurrentStage', async (e)=>{
        console.log(e);
        const {data: receivedData} = e;
        const gameStage = +receivedData;
        handleChangeCurrentStage(gameStage);
    });
    eventSource.addEventListener('error', (e) => {
        console.error('EventSource failed:', e);
        console.log(eventSource.readyState);
        if (eventSource.readyState === EventSource.CLOSED) {
            console.log('Connection closed.');
        }
        if (eventSource.readyState === EventSource.CONNECTING) {
            console.log('Attempting to reconnect...');
        }
    });
    return eventSource;
}


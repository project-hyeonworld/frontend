import {My} from "../../configuration/web/WebConfig";
import axios from "axios"
import React from "react";

const my = new My();

export function EnterGameAxios(partyId: number, userId: number) {
    console.log("SEND ENTER GAME AXIOS")
    axios({
        url: "/api/v2/auth/session" + "/game",
        method: 'post',
        baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
        withCredentials: true,
        data : {
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


export function GameAPI(setStage: (stage: number) => void, getList: (stage: string[]) => void, removeWaitingList: ( memberName: string) =>void, addWaitingList: ( memberName: string) =>void, userId : number) {
    axios({
        url: "api/game-stage/" + "init",
        method: 'get',
        baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
        withCredentials: true,
    }).then(function (response) {
        setStage(response.data);
    });

    axios({
        url: "member/" + "waiting-list/init",
        method: 'get',
        baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
        withCredentials: true,
        params: {
            memberId: userId,
        }
    }).then(function (response) {
        console.log(response.data);
        getList(response.data);
    });

    let eventSource : EventSource;

    eventSource = new EventSource('http://'+my.backendIpAddress+":"+my.backEndPort+`/api/game-stage?memberId=${userId}`);

    eventSource.addEventListener('connect', (e)=>{
        const {data: receivedConnectData} = e;
        console.log('connect event data101 : ',receivedConnectData);
    });

    eventSource.addEventListener('currentGameStage', async (e)=>{
        console.log("currentGameStage : LISTENER");
        const {data: receivedData} = e;
        const jsonObject = await JSON.parse(receivedData);
        //var jsonString = JSON.stringify(jsonObject, null, 2);
        setStage(jsonObject.gameStage);
    });

    eventSource.addEventListener('RemoveWaitingList', async (e)=>{
        console.log("WaitingLIST : LISTENER");
        const {data: receivedData} = e;
        const jsonObject = await JSON.parse(receivedData);
        removeWaitingList(jsonObject.memberName);
    });

    eventSource.addEventListener('AddWaitingList', async (e)=>{
        console.log("WaitingLIST : LISTENER");
        const {data: receivedData} = e;
        const jsonObject = await JSON.parse(receivedData);
        addWaitingList(jsonObject.memberName);
    });

    function closeConnection(){
        console.log("Close Event Source STAGE");
        eventSource.close();
    }

    return {
        closeConnection,
    }

};

export function WaitingAPI(partyId: number, removeWaitingList: ( memberName: string) =>void, addWaitingList: ( memberName: string) =>void) {

    let eventSource : EventSource;

    eventSource = new EventSource('http://'+my.backendIpAddress+":"+my.backEndPort+`/api/v2/sse/${partyId}/waiting-list`);
    eventSource.addEventListener('connect', (e)=>{
        const {data: receivedConnectData} = e;
        console.log('connect event data101 : ',receivedConnectData);
        //getStage(receivedConnectData);
    });


    function closeConnection(){
        console.log("Close Event Source Waiting");
        eventSource.close();
    }

    return {
        closeConnection,
    }
};

export function GetGameStageListenerAxios(partyId: number, userId: number, handleChangeCurrentStage : (gameStage : number) => void) {

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


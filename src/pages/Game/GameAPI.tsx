import {My} from "../../configuration/web/WebConfig";
import axios from "axios"


export function GameAPI(setStage: (stage: number) => void, getList: (stage: string[]) => void, removeWaitingList: ( memberName: string) =>void, addWaitingList: ( memberName: string) =>void, memberId : number) {
    const my = new My();

    axios({
        url: "api/game-stage/" + "init",
        method: 'get',
        baseURL: `http://${my.ipAddress}:${my.backEndPort}`,
        withCredentials: true,
    }).then(function (response) {
        setStage(response.data);
    });

    axios({
        url: "member/" + "waiting-list/init",
        method: 'get',
        baseURL: `http://${my.ipAddress}:${my.backEndPort}`,
        withCredentials: true,
        params: {
            memberId: memberId,
        }
    }).then(function (response) {
        console.log(response.data);
        getList(response.data);
    });

    let eventSource : EventSource;

    eventSource = new EventSource('http://'+my.ipAddress+":"+my.backEndPort+`/api/game-stage?memberId=${memberId}`);

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

export function WaitingAPI(getList: (stage: string[]) => void, removeWaitingList: ( memberName: string) =>void, addWaitingList: ( memberName: string) =>void, memberId : number) {
    const my = new My();




    let eventSource : EventSource;

    eventSource = new EventSource('http://'+my.ipAddress+":"+my.backEndPort+`/member/waiting-list/additional?memberId=${memberId}`);
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


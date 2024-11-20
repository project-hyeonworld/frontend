import axios from "axios";
import {My} from "../../../configuration/web/WebConfig";

const my = new My();

export function GetWaitingListAxios(partyId: number, initNamesOnWaitingList : (waitingList : string[]) => void) {
  console.log("SEND WAITING LIST")
  axios({
    url: "/api/v2/sse/" + partyId + "/waiting-list/init",
    method: 'get',
    baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
    withCredentials: true,
  }).then(function (response) {
    initNamesOnWaitingList(response.data);
  });
}

export function GetWaitingListListenerAxios(partyId: number, userId: number, removeWaitingList: ( memberName: string) =>void, addWaitingList: ( memberName: string) =>void) {

  let eventSource : EventSource;
  eventSource = new EventSource('http://'+my.backendIpAddress+":"+my.backEndPort+`/api/v2/sse/${partyId}/waiting-list?userId=${userId}`);

  eventSource.addEventListener('connect', (e)=>{
    const {data: receivedConnectData} = e;
    console.log('connect event data101 : ',receivedConnectData);
  });
  eventSource.addEventListener('open', () => {
    console.log('Connection established.');
  });

  eventSource.addEventListener('AddNameToWaitingList', async (e)=>{
    console.log(e);
    const {data: receivedData} = e;
    addWaitingList(receivedData);
  });

  eventSource.addEventListener('RemoveNameFromWaitingList', async (e)=>{
    console.log(e);
    const {data: receivedData} = e;
    removeWaitingList(receivedData);
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
};
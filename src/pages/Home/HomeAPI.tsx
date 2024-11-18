import axios from 'axios';
import {My} from '../../configuration/web/WebConfig';


const my = new My();


export function CurrentGameAxios(partyId: number, callback: (data: any) => void) {
  axios({
    url: "/api/v2/parties/" + partyId + "/dashboard/game",
    method: 'get',
    baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
    withCredentials: true,
  }).then(function (response) {
    callback(response.data);
  });
};

export function DisplayGameAxios(callback: (data: any) => void) {

  axios({
    url: "/api/v2/games/" + "playable",
    method: 'get',
    baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
    withCredentials: true,
  }).then(function (response) {
    callback(response.data.games);
  });
};

export function LogoutAxios(callback: (data: any) => void, logoutId: number) {
  axios({
    url: "/api/v2/auth/session",
    method: 'delete',
    baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
    withCredentials: true,
    data: {
      userId: logoutId
    }
  }).then(function (response) {
    callback(response.data);
  }).catch(function (error) {
    console.error("Logout failed:", error);
    // Handle the error appropriately
  });
};

export function HomeAxios(url: string, callback: (data: any) => void) {
  axios({
    url: "/home/" + url,
    method: 'get',
    baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
    withCredentials: true,
  }).then(function (response) {
    callback(response.data);
  });
};

import axios from 'axios';
import {My} from '../../configuration/web/WebConfig';


const my = new My();


export function CurrentGameAxios(partyId : number, callback: (data: any) => void) {
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
    console.log("Display");

    axios({
        url: "/api/v2/games/" + "playable",
        method: 'get',
        baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
        withCredentials: true,
    }).then(function (response) {
        console.log(response)
        callback (response.data.games);
    });
};

export function LogoutAxios(callback: (data: any) => void, logoutId : number) {
    axios({
        url: "member/" + "logout-confirm",
        method: 'post',
        baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
        withCredentials: true,
        params: {
            logoutId : logoutId
        }
    }).then(function (response) {
            callback (response.data);
    });
};

export function HomeAxios(url: string, callback: (data: any) => void) {
    axios({
        url: "/home/" + url,
        method: 'get',
        baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
        withCredentials: true,
    }).then(function (response) {
        callback (response.data);
    });
};

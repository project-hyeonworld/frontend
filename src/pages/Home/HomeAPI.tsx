import axios from 'axios';
import {My} from '../../configuration/web/WebConfig';
import {list} from "postcss";

const my = new My();

export function EnterGameAxios(memberId: number) {
    console.log("SEND ENTER GAME AXIOS")
    axios({
        url: "member/" + "enter-game",
        method: 'post',
        baseURL: `http://${my.ipAddress}:${my.backEndPort}`,
        withCredentials: true,
        data : {
            memberId : memberId,
        }
    });
};

export function ExitGameAxios(memberId: number) {
    axios({
        url: "member/" + "exit-game",
        method: 'post',
        baseURL: `http://${my.ipAddress}:${my.backEndPort}`,
        withCredentials: true,
        data : {
            memberId : memberId,
        }
    }).then(function (response) {
        console.log("결과");
        console.log("EXIt :"+response.data);
    });
};




export function CurrentGameAxios(callback: (data: any) => void) {
    axios({
        url: "party/" + "current-game",
        method: 'get',
        baseURL: `http://${my.ipAddress}:${my.backEndPort}`,
        withCredentials: true,
    }).then(function (response) {
        callback(response.data);
    });
};

export function DisplayGameAxios(callback: (data: any) => void) {
    console.log("Display");
    axios({
        url: "game/" + "playable",
        method: 'get',
        baseURL: `http://${my.ipAddress}:${my.backEndPort}`,
        withCredentials: true,
    }).then(function (response) {
        console.log("THEN")
        callback (response.data);
    });
};

export function LogoutAxios(callback: (data: any) => void, logoutId : number) {
    axios({
        url: "member/" + "logout-confirm",
        method: 'post',
        baseURL: `http://${my.ipAddress}:${my.backEndPort}`,
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
        baseURL: `http://${my.ipAddress}:${my.backEndPort}`,
        withCredentials: true,
    }).then(function (response) {
        callback (response.data);
    });
};

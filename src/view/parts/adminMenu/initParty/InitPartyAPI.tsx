import {My} from "configuration/web/WebConfig";

import axios from "axios";

const my = new My();


interface initData {
    relationType: number;
    persons: number;
    partyId?: number;
}

export function InitAxios(partyId: number, relationType : number, persons : number, callback: (partyId:number) => void) {
    const sendingData : initData = {
        relationType,
        persons,
        ...(partyId > 0 && {partyId}),
    };

    axios({
        url: "/api/v2/parties",
        method: 'post',
        baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
        withCredentials: true,
        data: sendingData
    }).then(function (response) {
        callback(response.data.id);
    });
};
import {My} from "configuration/web/WebConfig";

import axios from "axios";

const my = new My();
export function GetRelationTypeAxios(handleRelationList : (list : string[]) => void) {
    axios({
        url: "/api/v2/users/relation-types",
        method: 'get',
        baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
        withCredentials: true,
    }).then(function (response) {
        console.log(typeof response.data)
        handleRelationList(response.data.relationTypes);
    });
}

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
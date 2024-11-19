import {My} from "configuration/web/WebConfig";

import axios from "axios";

export function InitAxios(partyType : number, persons : number, callback: (partyId:number) => void) {
    const my = new My();
    axios({
        url: "/api/v2/parties",
        method: 'post',
        baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
        withCredentials: true,
        data: {
            relationType : partyType,
            persons : persons,
        }
    }).then(function (response) {
        callback(response.data.id);
    });
};
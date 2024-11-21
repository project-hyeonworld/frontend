import {My} from "configuration/web/WebConfig";

import axios from "axios";



export function UserAxios(name : string, relationType: number, relation: number) {
    const my = new My();
    axios({
        url: "/api/v2/users",
        method: 'post',
        baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
        withCredentials: true,
        data: {
            name: name,
            relationType: relationType,
            relation : relation,
        }
    }).then(function (response) {
    });
};
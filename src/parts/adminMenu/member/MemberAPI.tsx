import {My} from "../../../configuration/web/WebConfig";

import axios from "axios";



export function MemberAxios(name : string, partyType : number, relation : number) {
    const my = new My();
    axios({
        url: "member",
        method: 'post',
        baseURL: `http://${my.ipAddress}:${my.backEndPort}`,
        withCredentials: true,
        data: {
            name: name,
            partyType : partyType,
            relation : relation,
        }
    }).then(function (response) {
    });
};
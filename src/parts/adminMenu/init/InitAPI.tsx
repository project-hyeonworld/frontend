import {My} from "../../../configuration/web/WebConfig";

import axios from "axios";

export function InitAxios(partyType : number, persons : number) {
    const my = new My();
    axios({
        url: "party/" + "init",
        method: 'post',
        baseURL: `http://${my.ipAddress}:${my.backEndPort}`,
        withCredentials: true,
        data: {
            partyType : partyType,
            persons : persons,
        }
    }).then(function (response) {
    });
};
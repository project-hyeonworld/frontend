import {My} from "../../../configuration/web/WebConfig";

import axios from "axios";

export function OpenGameAxios(game : number) {
    console.log("FGGGG"+game);
    const my = new My();
    axios({
        url: "party/" + "current-game",
        method: 'put',
        baseURL: `http://${my.ipAddress}:${my.backEndPort}`,
        withCredentials: true,
        data: {
            game : game,
        }
    }).then(function (response) {
    });
};
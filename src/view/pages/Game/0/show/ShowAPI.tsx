import {Submission} from "../Submission";
import {My} from "configuration/web/WebConfig";
import axios from "axios";

export function ShowAPI(partyId: number, getContent: (content: string) => void) {
    const my = new My();
    console.log("SHOWAPI"+partyId);
    axios({
        url: "/api/v2/parties/"+ partyId + "/rounds/shows",
        method: 'get',
        baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
        withCredentials: true,
    }).then(function (response) {
        getContent(response.data.content);
    }).catch(function (error) {
        if (error.response.status == 500) {

        }
    })
};
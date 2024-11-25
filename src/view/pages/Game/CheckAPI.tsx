import {My} from "../../../configuration/web/WebConfig";
import {Special} from "../../../configuration/special/SpecialConfig";
import axios from "axios"
import {SubmissionAdmin} from "./0/Submission";

export function CheckTargetAPI(getResponse: ()=> void, memberName: string) {
    const my = new My();

    axios({
        url: "round/0",
        method: 'post',
        baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
        withCredentials: true,
        data : {
            memberName: memberName
        }
    });

    axios({
        url: "party/target",
        method: 'put',
        baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
        withCredentials: true,
        data : {
            memberName: memberName
        }
    }).then(function (response) {
        getResponse();
    });


};

export function CheckAPI(partyId: number, getPlayer: (submissions: SubmissionAdmin[]) => void) {
    const my = new My();
    const special = new Special();


    axios({
        url: "/api/v2/parties/"+ partyId + "/rounds/checks",
        method: 'get',
        baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
        withCredentials: true,
    }).then(function (response) {
        const dataList = response.data;
        console.log(response.data);
        const submissionList: SubmissionAdmin[] = [];
        Object.entries(dataList).forEach(([name, player]) => {
            const map = new Map(Object.entries(player as Object[]));
            const tmp: string = map.get('text') as string;
            const textList: string[] = tmp.split(',');
            const number: number = map.get('number') as number;

            submissionList.push({
                name,
                textList,
                number,
            });
        });
        getPlayer(submissionList);
    });
};
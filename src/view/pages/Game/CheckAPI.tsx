import {My} from "../../../configuration/web/WebConfig";
import {Special} from "../../../configuration/special/SpecialConfig";
import axios from "axios"

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

interface Participant {
    name: string;
    text: string;
    number: number;
}

export function CheckAPI(partyId: number, roundId:number|null, handleEntry: (submissions: Submission[]) => void) {
    const my = new My();
    const special = new Special();


    axios({
        url: "/api/v2/parties/"+ partyId + "/rounds/"+ roundId + "/checks",
        method: 'get',
        baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
        withCredentials: true,
    }).then(function (response) {
        const dataList = response.data;
        console.log(response.data);
        const submissionList: Submission[] = Object.entries(dataList).map(([_, participant]) => {
            const { name, text, number } = participant as Participant;

            return {
                name,
                texts: text.split(','),
                number,
            };
        });
        handleEntry(submissionList);
    });
};
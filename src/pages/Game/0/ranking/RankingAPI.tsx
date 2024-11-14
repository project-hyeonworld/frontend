import {My} from "../../../../configuration/web/WebConfig";
import {Special} from "../../../../configuration/special/SpecialConfig";
import axios from "axios";
import {MemberScore} from "../../../../DTO/MemberScore";

export function RankingAPI(getList : any) {
    const my = new My();
    const special = new Special();
    axios({
        url: "member/ranking",
        method: 'get',
        baseURL: `http://${my.ipAddress}:${my.backEndPort}`,
        withCredentials: true,
    }).then(function (response) {
        console.log(response);
        console.log(response.headers);
        console.log(response.data); //
        const memberList = response.data.memberList;
        const objectArray : MemberScore[] = Array.from(memberList);

        let list : MemberScore[];
        getList(objectArray);
    });


};
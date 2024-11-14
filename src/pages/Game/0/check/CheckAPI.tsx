import {My} from "../../../../configuration/web/WebConfig";
import {Special} from "../../../../configuration/special/SpecialConfig";
import axios from "axios"
import React from "react";
import {SubmissionAdmin} from "../Submission";

export function CheckTargetAPI(getResponse: ()=> void, memberName: string) {
    const my = new My();

    axios({
        url: "round/0",
        method: 'post',
        baseURL: `http://${my.ipAddress}:${my.backEndPort}`,
        withCredentials: true,
        data : {
            memberName: memberName
        }
    });

    axios({
        url: "party/target",
        method: 'put',
        baseURL: `http://${my.ipAddress}:${my.backEndPort}`,
        withCredentials: true,
        data : {
            memberName: memberName
        }
    }).then(function (response) {
        getResponse();
    });


};

export function CheckAPI(getPlayer: (submissions: SubmissionAdmin[]) => void) {
    const my = new My();
    const special = new Special();

    console.log("CHECKAPI");

    axios({
        url: "submission/0",
        method: 'get',
        baseURL: `http://${my.ipAddress}:${my.backEndPort}`,
        withCredentials: true,
        params : {
            memberId: special.adminId
        }
    }).then(function (response) {
        const dataList = response.data;
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
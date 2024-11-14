import {My} from "../../../../configuration/web/WebConfig";
import axios from "axios";
import {type} from "@testing-library/user-event/dist/type";
import {Special} from "../../../../configuration/special/SpecialConfig";

export function ResultAPI(getNameList: (nameList: string[]) => void) {
    const my = new My();

    axios({
        url: "round/0",
        method: 'get',
        baseURL: `http://${my.ipAddress}:${my.backEndPort}`,
        withCredentials: true,
    }).then(function (response) {
        console.log(response);
        console.log(response.headers);
        console.log(response.data);
        const correctNameList = response.data.CorerectNameList;
        const stringArray : string[] = Array.from(correctNameList);

        console.log("AAAA : "+stringArray);
        console.log("DATALIST : "+response);
        console.log("DATALIST.data : "+response.data);
        //const dataList = response.data;


        getNameList(stringArray);
    });
};

export function SetScoreAxios(memberId : number, correct : number, wrong : number) {
    const my = new My();
    const special = new Special();

    if (memberId == special.adminId){
        console.log("INIT ROUND");
        axios({
            url: "round/0",
            method: 'put',
            baseURL: `http://${my.ipAddress}:${my.backEndPort}`,
            withCredentials: true,
        });
    }

    axios({
        url: "member/score/0",
        method: 'put',
        baseURL: `http://${my.ipAddress}:${my.backEndPort}`,
        withCredentials: true,
        data : {
            correct,
            wrong
        }

    }).then(function (response) {
        //console.log("aa"+response.data);
        //console.log(response.data.keys()); //Array Iterator()

        //const stringArray : string[] = Array.from (Object.values(response.data));

        //getNameList(response.data);
    });
};
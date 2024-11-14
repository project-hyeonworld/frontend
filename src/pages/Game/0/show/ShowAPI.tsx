import {Submission} from "../Submission";
import {My} from "../../../../configuration/web/WebConfig";
import axios from "axios";

export function ShowAPI(getSubmission: (submission: Submission) => void) {
    const my = new My();

    axios({
        url: "party/target",
        method: 'get',
        baseURL: `http://${my.ipAddress}:${my.backEndPort}`,
        withCredentials: true,
    }).then(function (response) {
        const dataList = response.data;
        console.log("DATAS"+dataList);
        const submission: Submission = dataList;
        console.log("NAME : "+submission.name);
        console.log("TEXT : "+submission.textList);
        getSubmission(submission);
    });
};
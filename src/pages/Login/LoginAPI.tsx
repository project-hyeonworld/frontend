import axios from 'axios';
import {My} from '../../configuration/web/WebConfig';

export default function LoginAxios(loginName : string ,callback: (data: any) => void) {
    const my = new My();
    axios({
        url: "member/" + "login-confirm",
        method: 'post',
        baseURL: `http://${my.ipAddress}:${my.backEndPort}`,
        withCredentials: true,
        data: loginName
    }).then(function (response) {
        callback(response.data);
    });
};
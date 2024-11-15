import axios from 'axios';
import {My} from '../../configuration/web/WebConfig';

export default function LoginAxios(loginName : string ,callback: (data: any) => void) {
    const my = new My();

    const loginData = {
        loginName: loginName
    };

    axios({
        url: "/api/v2/auth/" + "session",
        method: 'post',
        baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        },
        data: loginData
    }).then(function (response) {
        callback(response.data.userId);
    }).catch(function (error) {
        callback(error.response.status);
    });
};
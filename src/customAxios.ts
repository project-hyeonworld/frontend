
import axios from 'axios';
import { My } from './configuration/web/WebConfig';

let customAxios;
export default customAxios = function customAxios(url: string, callback: (data: any) => void) {
    const my = new My();
    axios({
        url: '/api' + url,
        method: 'post',
        baseURL: `http://${my.ipAddress}:${my.backEndPort}`,
        withCredentials: true,
    }).then(function (response) {
        callback(response.data);
    });
};


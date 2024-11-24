import axios from "axios";
import {My} from "../../../../configuration/web/WebConfig";

const my = new My();

export function GetCurrentRoundAxios(partyId: number, handleRoundId: (roundId: number|null) => void) {
  console.log("GETCOURRN "+partyId);
  axios({
    url: "/api/v2/parties/" + partyId + "/rounds",
    method: 'get',
    baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
    withCredentials: true,
    data: {
      partyId: partyId
    }
  }).then(function (response) {
    console.log(response);
    handleRoundId(response.data.roundId);
  }).catch(function (error) {
    if (error.response && error.response.stat === 404) {
      handleRoundId(null);
    }
  });
}

export function InitRoundAxios(partyId: number, handleRoundId: (roundId: number|null) => void) {

  axios({
    url: "/api/v2/parties/" + partyId + "/rounds",
    method: 'post',
    baseURL: `http://${my.backendIpAddress}:${my.backEndPort}`,
    withCredentials: true,
  }).then(function (response) {
    handleRoundId(response.data.roundId);
  });
};
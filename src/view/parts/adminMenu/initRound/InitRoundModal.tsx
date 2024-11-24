import React, {ChangeEvent, useCallback, useEffect, useRef, useState} from 'react';
import {usePartyContext} from "../../../../context/party/PartyContext";
import {GetCurrentRoundAxios, InitRoundAxios} from "./InitRoundModalAPI";

interface InitRoundModalProps {
  onRound: () => void
}

const InitRoundModal = (props : InitRoundModalProps) => {
  const partyContext = usePartyContext("InitRoundModal");
  const [roundId, setRoundId] = useState<number|null>(null);
  const {partyId} = partyContext;

  useEffect(() => {
    GetCurrentRoundAxios(partyId, handleRoundId);
  }, []);

  const handleRoundId = (roundId: number|null) => {
    setRoundId(roundId);
  }

  const commitInit = (event : React.MouseEvent<HTMLButtonElement>) => {
    InitRoundAxios(partyId, handleRoundId);
  }

  return (
      <div className={"h-screen w-full fixed left-0 top-0 flex justify-center bg-black bg-opacity-70"}>
        <div className={"bg-white fixed bottom-1/3 rounded-2xl w-10/12 h-2/5"}>
          <div className={"border-b px-4 flex justify-between items-center"}>
            <h3 className={"font-extrabold"}>Init</h3>
          </div>

          <label htmlFor="relation-slider"
                 className="block mb-2 text-sm font-medium text-gray-900"/>
          <p>현재 라운드 ID : {roundId}</p>




          <div className={"border-b px-4 py-2 flex items-center"}/>
          <div className={"flex justify-center items-center w-100 py-2 text-gray-500"}>
            <button onClick={commitInit} className={"bg-red-600 hover:bg-red-700 rounded text-white mx-2"}>초기화</button>
            <button onClick={props.onRound} className={"bg-gray-600 hover:bg-gray-700 rounded text-white"}>취소</button>
          </div>
        </div>
      </div>
  )
}

export default InitRoundModal;
import React, {useContext, useEffect, useState} from 'react';
import {LogoutAxios} from "../../pages/Home/HomeAPI";
import ScoreModal from "./scoreModal/ScoreModal";
import {LoginContext} from "context/login/LoginContext";
import {PartyContext, usePartyContext} from "context/party/PartyContext";

interface MenuBarProps{
    moveBack: ()=> void;
}

function MenuBar (props : MenuBarProps){
    const loginContext = useContext(LoginContext);
    const partyContext = usePartyContext("MenuBar");

    if (!loginContext) {
        throw new Error('MenuBar must be used within a LoginProvider');
    }
    if (!partyContext) {
        throw new Error('MenuBar must be used within a PartyProvider');
    }
    const { setLogin } = loginContext;
    const { userId } = partyContext;



    const [year, setYear] = useState(new Date().getFullYear());
    const [showScore, setScore] = useState(false);

    const onClickLogout = (event : React.MouseEvent<HTMLButtonElement>) => {
        function checkName(name: string) {

            // document.location.href = '/';
            //props.logOut();
            setLogin(false);
        }

        LogoutAxios(checkName, userId);
    }

    const onClickScore = (event : React.MouseEvent<HTMLButtonElement>) => {
        console.log ("현재 점수");
        setScore(true);
    }

    const onCloseModal = (()=>{
        console.log("ddddd")
       setScore(!showScore);
    });

    return (
        <div className="MenuBar">
            {showScore && <ScoreModal onClose ={onCloseModal}></ScoreModal>}
            <div className="flex flex-row py-4 px-0.5">
                <div className="flex-grow rounded-lg">
                    <div className="flex justify-end">
                        <button className="bg-red-600 mr-2  shadow-lg shadow- hover:shadow-red-700 hover:bg-red-700 text-white cursor-pointer px-3 py-1 text-center justify-center items-center rounded-xl flex space-x-2 flex-row" onClick={props.moveBack}>뒤로가기</button>
                        <button className="bg-red-600 mr-2  shadow-lg shadow- hover:shadow-red-700 hover:bg-red-700 text-white cursor-pointer px-3 py-1 text-center justify-center items-center rounded-xl flex space-x-2 flex-row" onClick={onClickScore}>현재점수</button>
                        <button className="bg-red-500 mr-2  shadow-lg shadow- hover:shadow-red-600 hover:bg-red-600 text-white cursor-pointer px-3 py-1 text-center justify-center items-center rounded-xl flex space-x-2 flex-row" onClick={onClickLogout}>로그아웃</button>

                    </div>
                </div>
            </div>
        </div>

    );
}
export default MenuBar;
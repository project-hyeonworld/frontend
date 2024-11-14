import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";

import {GameProps} from "./GameProps/GameProps";

import Game0 from './0/Game0Main';
import Game1 from "./1/Game1Main";
import Game2 from "./2/Game2Main";
import Game3 from "./3/Game3Main";
import Game4 from "./4/Game4Main";
import Game5 from "./5/Game5Main";
import {GameAPI} from "./GameAPI";

export const Games = {
    "진실 혹은 거짓": Game0,
    "무작위 세 단어": Game1,
    "소수결 게임": Game2,
    "퀴즈퀴즈": Game3,
    "떡 먹은 현우 찾기": Game4,
    "선택지 게임": Game5,
}

type stateData = {
    id: number;
    rootCall: (data : boolean, loginName :string)=>void;
    name: string;
}

function Game(props : GameProps) {
    // IP주소 변수 선언
    const [game, setGame] = useState<number>(props.gameId);
    const [stage, setStage] = useState<number> (1);
    const [waitingList, setList] = useState <string[]> ([]);

    const removeWaitingList = (memberName : string) => {
        console.log("리무브 : " +memberName);
        console.log ("STAGE : "+stage);

        setList((prevList) => prevList.filter((item) => item !== memberName));

    }

    const addWaitingList = (memberName : string ) => {
        setList((prevList) => {
            if (!prevList.includes(memberName)) {
                console.log("함포");
                return [...prevList, memberName];
            }
            console.log("미포");
            return prevList;
        });
    }

    useEffect(()=>{
        setGame (props.gameId);





        function changeStage (stage :number){
            console.log("CHANGE STAGE : "+stage);
            setStage(stage);
        }

        // const waitingApi = WaitingAPI (setList, removeWaitingList, addWaitingList, props.memberId);
        // const stageApi = StageAPI (changeStage, props.memberId);

        const GameApi = GameAPI (changeStage, setList, removeWaitingList, addWaitingList, props.memberId);

        return () => {
            GameApi.closeConnection();
            // stageApi.closeConnection();
            // waitingApi.closeConnection();
        }
    },[])

    return (
        <div className="Game">
            <ul className="p-2 space-y-1"/>
            <div className="flex mx-2 items-center justify-center rounded-xl group sm:flex space-x-2">

                {Object.entries(Games).map(([gameName, gameComponent], index) =>{
                if (game == index){
                    const Component = gameComponent;
                    return (
                        <div key={index}>
                            <p>{gameName}</p>
                            <Component memberId={props.memberId} memberName={props.memberName} gameId={props.gameId} stage={stage} key={index}/>
                        </div>
                    );
                }
            })}

            </div>
            {stage == 1 && <div className={"waitngList"}>
                <svg aria-hidden="true"
                     className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-black-300 fill-red-600"
                     viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"/>
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"/>
                </svg>
                {
                    waitingList.map((memberName :string)=>{
                        return (
                            <p>{memberName} 님</p>
                        );
                    })  }
                {waitingList.length != 0? <p>기다리고 있습니다.</p> : <p>모두 게임에 들어왔습니다.</p> }
            </div>}

        </div>
    )
}



export default Game;
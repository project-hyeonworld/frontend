import React, {useEffect, useState} from "react";
import {RankingAPI} from "../../../pages/Game/0/ranking/RankingAPI";

import {MemberScore} from "../../../DTO/MemberScore";

interface ScoreModalProps{
    onClose : any;
}

const ScoreModal = ( props: ScoreModalProps) => {

    const [list, setList] = useState<MemberScore[]>();

    const getList = ((memberList : MemberScore[])=>{
        setList(memberList);
    })

    useEffect(()=>{
        RankingAPI(getList);
    },[])

    let rank : number = 0;
    let prevScore : number = 0;

    return (
        <div className={"h-screen w-full fixed left-0 top-0 flex justify-center bg-black bg-opacity-70"}>
            <div className={"py-2 px-4 bg-white fixed bottom-1/3 rounded-2xl w-10/12 h-1000"} key={12}>

                {list?.map((memberScore : MemberScore)=>{
                return (
                <div key={memberScore.memberName} className={"grid grid-cols-3"}>
                <p>{prevScore == memberScore.totalScore ? (rank)  : (++rank)}위</p>
                <p>{memberScore.memberName}</p>
                <p>{memberScore.totalScore}</p>
            </div>
            )
            })}
                <button onClick={props.onClose} className={"py-2 px-4 bg-gray-600 hover:bg-gray-700 rounded-2xl text-white"}>확인</button>
            </div>
        </div>
    )
}
export default ScoreModal;
import React, {useEffect, useState} from "react";
import {GameStageProps} from "../../GameProps/GameProps";
import {RankingAPI} from "./RankingAPI";
import {MemberScore} from "../../../../DTO/MemberScore";

export default function Ranking (props : GameStageProps){
    const [list, setList] = useState<MemberScore[]>();
    const getList = ((memberList : MemberScore[])=>{
        setList(memberList);
    })

    useEffect(()=>{
        RankingAPI(getList);
    },[])

    const Chart = ()=>{


    }

    let rank : number = 0;
    let prevScore : number = 0;

    return (
        <div className="Game0">

            <p>랭킹</p>
            {

                list?.map((memberScore : MemberScore)=>{
                    return (
                        <div key={memberScore.memberName} className={"grid grid-cols-3"}>
                            <p>{prevScore == memberScore.totalScore ? (rank)  : (++rank)}위</p>
                            <p>{memberScore.memberName}</p>
                            <p>{memberScore.totalScore}</p>
                        </div>
                    )
                })
            }
        </div>
    );
}
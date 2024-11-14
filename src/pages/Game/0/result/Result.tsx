import React, {ChangeEvent, useEffect, useState} from "react";
import {GameProps, GameStageProps} from "../../GameProps/GameProps";
import {ResultAPI, SetScoreAxios} from "./ResultAPI";
import {ShowAPI} from "../show/ShowAPI";
import {Special} from "../../../../configuration/special/SpecialConfig";

export default function  Result(props : GameStageProps) {
    const [correct, setCorrect] = useState<number>(2);
    const [wrong, setWrong] = useState<number>(0);
    const [correctName, setCorrectName] = useState<string[]>();

    const getNameList = ((nameList : string[])=>{
        console.log("NAMELIST : "+nameList);
        setCorrectName(nameList);
    })
    const special = new Special();

    useEffect(()=>{
        ResultAPI(getNameList);
    },[])

    const handleCorrect = (event : ChangeEvent<HTMLInputElement>) => {
        setCorrect(Number(event.target.value));
    }

    const oninit = () => {
        setCorrect (2);
        setWrong (0);
    }

    const onSetCorrect = () =>{
        SetScoreAxios(props.memberId, correct, wrong);
        oninit();
    }

    const handleWrong = (event : ChangeEvent<HTMLInputElement>) => {
        setWrong(Number(event.target.value));
    }

    const onSetWrong = () =>{
        SetScoreAxios(props.memberId, correct, wrong);
        oninit();
    }

    return (
        <div className="Game0">
            <div className={"grid grid-cols-3"}>
                <div className={"ScoreSetting"}>
                    {props.memberId == special.adminId && <div>
                        <input className={"text-center w-40"} type={"text"} value={correct} onChange={handleCorrect}></input>
                        <input id="default-range" type="range" min="1" max="100" step={"1"} onChange={handleCorrect} value={correct}
                               className="w-70 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                        <button  className={"bg-red-600 hover:bg-red-700 rounded text-white mx-2"} onClick={onSetCorrect}>확인</button>
                    </div>}


                    {/* Add any other input fields or buttons as needed */}
                </div>
                <div className={"form"}>
                    <p>맞추신 분 :</p>
                    {correctName?.map ((name, index)=>{
                        return (
                            <div key={index}>
                                <p>{name}</p>
                                <ul className={"p-4"}></ul>
                            </div>
                        )
                    })}
                </div>
                <div className={"Wrong"}>
                    {props.memberId == special.adminId && <div>
                        <input className={"text-center w-40"} type={"text"} value={wrong} onChange={handleWrong}></input>
                        <input id="default-range" type="range" min="-45" max="100" step={"1"} onChange={handleWrong} value={wrong}
                               className="w-70 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                        <button  className={"bg-blue-600 hover:bg-red-700 rounded text-white mx-2"} onClick={onSetWrong}>확인</button>
                    </div>}
                </div>

            </div>

        </div>
    );
}
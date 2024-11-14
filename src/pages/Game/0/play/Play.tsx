import React, {useEffect, useState} from "react";
import {GameStageProps} from "../../GameProps/GameProps";
import ConfirmModal from "./confirm/ConfirmModal";
import {PlayAPI} from "./PlayAPI";


export default function Play(props : GameStageProps) {

    const [playConfirm, setConfirm] = useState (false);
    const [button, setButton] = useState<number>(-1);
    const [completed, setCompleted] = useState<string>("거짓을 선택해 주세요.");

    const onConfirm = (val : boolean)=>{
        if (val) {
            console.log("FFF");
            PlayAPI(props.memberId, button);
            setCompleted("선택을 완료하셨습니다.")
        }
        setConfirm(!playConfirm);

    }

    const handlePlay = (event : React.MouseEvent<HTMLButtonElement>)=> {
        console.log(props.target?.textList[1]);
        const target : any = event.target as HTMLButtonElement;
        const value : any = target.getAttribute("id");
        setButton(value);
        setConfirm(!playConfirm);
    }

    useEffect(()=>{

    },[])


    return (
        <div className="Game0">
            {playConfirm && <ConfirmModal onConfirm={onConfirm} value={props.target?.textList[button]}/>}
            <p>{completed}</p>

            <button>{props.target?.name}님</button>
            {props.target?.textList?.map ((text, index)=>{
                return (
                    <div key={index}>
                        <button id={index.toString()} className={"bg-blue-500 rounded-2xl p-2"} onClick={handlePlay}>{text}</button>
                        <ul className={"p-4"}></ul>
                    </div>
                )
            })}
        </div>
    );
}
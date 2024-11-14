import React, {useState} from "react";

import ConfirmModal from "./confirm/ConfirmModal";
import {SubmitAPI} from "./SubmitAPI";
import {GameStageProps} from "../../GameProps/GameProps";

export default function Submit(props : GameStageProps){

    const [inputFalse, setFalse] = useState<number>(-1);

    const [input, setInput] = useState<string[]> (["", "", ""]);

    const [buttonTitle, setButton] = useState ('거짓 명제 선택 후 제출');
    const [modalConfirm, setConfirm] = useState (false);
    const [completed, setCompleted] = useState (false);

    const inputInit = {
        0 : "첫번째 명제",
        1 : "두번째 명제",
        2 : "세번째 명제",
    }

    const onSend = (val : boolean) =>{
        if (val){
            setButton("다시 제출하기");
            setCompleted(!completed);
        }

    }

    const onConfirm = (val : boolean)=>{
        if (val) {
            console.log("FFF");
            SubmitAPI(props.memberId, onSend, input, inputFalse);
        }

        setConfirm(!modalConfirm);
    }

    const onModal = ()=>{
        setConfirm(!modalConfirm);
    }

    const handleSubmit = (event : React.MouseEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (buttonTitle == '제출하기' || buttonTitle == '다시 제출하기')
            onModal();
    };

    const handleFalse = (event : React.MouseEvent<HTMLInputElement>)=>{
        const target = event.target as HTMLInputElement;
        const value : any = target.getAttribute("id");
        const parseValue : number = parseInt(value);
        setFalse(parseValue);
        setButton("제출하기");
    }

    const handleInputChange = (index: number, event : React.ChangeEvent<HTMLInputElement>) => {
        let value : string = event.target.value;

        if (value.includes(';') || value.includes(',') || value.length > 80){}

        else {
            setInput((prevInput)=> {
                const updatedInput = [...prevInput];
                updatedInput[index] = value;
                return updatedInput;
            })
        }



    }

    return (
        <div className="Game0Submit">
            {completed?<p>제출 완료 했습니다</p> : <p>제출해주세요</p>}

            {modalConfirm && <ConfirmModal onConfirm={onConfirm} value={input[inputFalse]}/>}

            <form onSubmit={handleSubmit}>
                <div className={"form-floating"}>
                    {Object.entries(inputInit).map(([key, label],index)=>(
                        <div key={key}>

                            <input type="radio" name="gener" id={key} onClick={handleFalse}/>
                            <input className="first form-control text-1xl p-0.7 ml-4 mt-2" placeholder={label} value={input[index]} onChange={(e)=>handleInputChange(index,e)}/>
                        </div>
                    ))}
                <button className={"py-2 px-4 bg-green-300 rounded-2xl mx-1 my-1 text-gray-900 hover:bg-gray-100" } type={"submit"}>{buttonTitle}</button>
                </div>
            </form>
        </div>
    );
}
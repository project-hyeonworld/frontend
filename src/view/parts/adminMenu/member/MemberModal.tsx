import React, {ChangeEvent, useState} from 'react';
import InitModal from "../init/InitModal";
import {OpenGameAxios} from "../open/OpenAPI";
import {MemberAxios} from "./MemberAPI";

export const PartyList: {[key: number] : string} = {
    0:"외가",
    1:"친가",
}
const MemberModal = ( {onMember}: any) => {
    const [name, setName] = useState<string>("");
    const [partyType, setParty] = useState<number>(-1);
    const [relation, setRelation] = useState<number>(0);
    const onName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = (event.target.value);
        setName(value);
    }
    const onRelation = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue : number = Math.min(parseInt(event.target.value, 10), 20);
        setRelation(newValue);
    }


    const handleParty = (event : ChangeEvent<HTMLInputElement>) => {
        setParty(Number(event.target.value));
    };

    const commitMember = (event : React.MouseEvent<HTMLButtonElement>) => {
        MemberAxios(name, partyType, relation);
        onMember();
    }

    return (
        <div className={"h-screen w-full fixed left-0 top-0 flex justify-center bg-black bg-opacity-70"}>
            <div className={"bg-white fixed top-1/3 rounded-2xl w-10/12 h-2/7"}>
                <div className={"border-b px-4 flex justify-between items-center"}>
                    <h3 className={"font-extrabold"}>Member</h3>
                </div>

                <label htmlFor="persons-slider"
                       className="block mb-2 text-m font-medium text-gray-900">성함</label>
                <input className={"text-center"} type={"text"} value={name} onChange={onName}
                       style={{border: "1px solid #ccc"}}></input>
                <label htmlFor="persons-slider"
                       className="block mb-2 text-m font-medium text-gray-900">{partyType == -1 ? "소속" : PartyList[partyType]}</label>
                <input id="default-range" type="range" min="0" max={Object.keys(PartyList).length - 1} step={"1"}
                       onChange={handleParty} value={partyType}
                       className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <label htmlFor="persons-slider"
                       className="block mb-2 text-m font-medium text-gray-900">촌수</label>
                <input className={"text-center"} type={"number"} value={relation} onChange={onRelation}
                       style={{border: "1px solid #ccc"}}></input>

                <div className={"border-b px-4 py-2 flex items-center"}/>
                <div className={"flex justify-center items-center w-100 py-2 text-gray-500"}>
                    <button onClick={commitMember} className={"bg-red-600 hover:bg-red-700 rounded text-white mx-2"}>저장
                    </button>
                    <button onClick={onMember} className={"bg-gray-600 hover:bg-gray-700 rounded text-white"}>취소
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MemberModal;
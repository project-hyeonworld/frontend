import React, {ChangeEvent, useCallback, useEffect, useRef, useState} from 'react';

import {InitAxios} from "./InitAPI"
import {usePartyContext} from "context/party/PartyContext";
import {GetRelationTypeAxios} from "../AdminMenuAPI";

interface RelationTypes {
    [key: number] : string;
}

const InitModal = ({onInit}: any) => {
    const partyContext = usePartyContext("InitModal");
    const [persons, setPerson] = useState<number>(1);
    const [relationList, setRelationList] = useState<RelationTypes>({});
    const [relationType, setRelationType] = useState<number> (0);

    const relationSlider = document.getElementById("relation-slider");
    const personsSlider = document.getElementById('persons-slider');

    const {partyId, setPartyId} = partyContext;

    if (relationSlider){
        relationSlider.addEventListener('input', function(event) {
            const value = (event.target as HTMLInputElement).value;
        });
    }
    if (personsSlider){
        personsSlider.addEventListener('input', function(event) {
            const value = (event.target as HTMLInputElement).value;
        });
    }

    useEffect(() => {
        GetRelationTypeAxios(handleRelationList);
    }, []);

    const handleRelationList = useCallback((list : RelationTypes) => {
        setRelationList(list);
    },[]);

    const handlePersons = useCallback((event : ChangeEvent<HTMLInputElement>) => {
        setPerson(Number(event.target.value));
    },[]);

    const handleRelationType = useCallback((event : ChangeEvent<HTMLInputElement>) => {
        setRelationType(Number(event.target.value));
    },[]);

    const commitInit = (event : React.MouseEvent<HTMLButtonElement>) => {
        function setPartyIdFunc(partyId : number) {
            console.log("qkRna" + partyId);
            setPartyId(partyId);
        }
        InitAxios(partyId, relationType, persons, setPartyIdFunc);
        onInit();
    }

    return (
        <div className={"h-screen w-full fixed left-0 top-0 flex justify-center bg-black bg-opacity-70"}>
            <div className={"bg-white fixed bottom-1/3 rounded-2xl w-10/12 h-2/5"}>
                <div className={"border-b px-4 flex justify-between items-center"}>
                    <h3 className={"font-extrabold"}>Init</h3>
                </div>

                <label htmlFor="relation-slider"
                       className="block mb-2 text-sm font-medium text-gray-900"/>
                <p>{relationList[relationType]}</p>
                <input id="relation-range" type="range" min={Math.min(...Object.keys(relationList).map(Number))} max={Math.max(...Object.keys(relationList).map(Number))} step={"1"} onChange={handleRelationType} value={relationType}
                       className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />

                <label htmlFor="persons-slider"
                       className="block mb-2 text-sm font-medium text-gray-900">인원</label>
                <input className={"text-center"} type={"text"} value={persons} onChange={handlePersons}></input>
                <input id="default-range" type="range" min="1" max="40" step={"1"} onChange={handlePersons} value={persons}
                       className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />

                <div className={"border-b px-4 py-2 flex items-center"}/>
                <div className={"flex justify-center items-center w-100 py-2 text-gray-500"}>
                    <button onClick={commitInit} className={"bg-red-600 hover:bg-red-700 rounded text-white mx-2"}>초기화</button>
                    <button onClick={onInit} className={"bg-gray-600 hover:bg-gray-700 rounded text-white"}>취소</button>
                </div>
            </div>
        </div>
    )
}

export default InitModal;
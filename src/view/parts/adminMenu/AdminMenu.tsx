import React, {useEffect, useState} from "react";

import InitModal from "./init/InitModal";
import OpenModal from "./open/OpenModal";
import MemberModal from "./member/MemberModal";
import {AdminDoneAxios, AdminMenuAxios, ChangeCurrentGameStageAxios} from "../adminMenu/AdminMenuAPI";
import {usePartyContext} from "context/party/PartyContext";

interface Game{
    id: number;
    name: string;
}

export const AdminMenuList = {
    Init: 0,
    Open: 1,
    Tutorial: 2,
    Submit: 3,
    Check: 4,
    Show: 5,
    Play: 6,
    Result: 7,
    Ranking: 8,
    Done: 9,
    Members: 10,
};



function AdminMenu (){
    const partyContext = usePartyContext("AdminMenu");
    const [initModal, setInit] = useState<boolean>(false);
    const [openModal, setOpen] = useState<boolean>(false);
    const [memberModal, setMember] = useState<boolean>(false);

    const {partyId} = partyContext;

    const MINIMUM_STAGE_VALUE = 1;
    const MAXIMUM_STAGE_VALUE = 8;

    useEffect(()=>{
    },[])

    const onInit = () => {
        setInit(!initModal);
    }
    const onOpen = () => {
        setOpen(!openModal);
    }
    const onDone = () => {
        AdminDoneAxios();
    }
    const onMember = () => {
        setMember(!memberModal);
    }





    const onClickButton = (event : React.MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLLIElement;
        const value : any = target.getAttribute("id");
        const parsedValue : number = parseInt(value);

        if (MINIMUM_STAGE_VALUE <= parsedValue && parsedValue <= MAXIMUM_STAGE_VALUE) {
            ChangeCurrentGameStageAxios(partyId, parsedValue);
        }

        switch (parsedValue) {
            case AdminMenuList["Init"]:
                onInit();
                break;
            case AdminMenuList["Open"]:
                onOpen();
                break;
            case AdminMenuList["Done"]:
                onDone();
                break;
            case AdminMenuList["Members"]:
                onMember();
                break;
            default:
                console.log("ㅁㄹ");
        }

    }

    return (
        <div className="AdminMenu">
            <div className={"grid grid-cols-5"}>
                {initModal && <InitModal onInit={onInit}/>}
                {openModal && <OpenModal onOpen={onOpen}/>}
                {memberModal && <MemberModal onMember={onMember}/>}
            {Object.entries(AdminMenuList).map(([menuName, index]) =>{
                return <button
                        type={"button"}
                        className={"bg-green-200 rounded-2xl mx-1 my-1 text-gray-900 hover:bg-gray-100" }
                        data-modal-target={"init-modal"}
                        data-modal-toggle={"init-modal"}
                        id={index.toString()}
                        key={index}
                        onClick={onClickButton}>
                        {menuName}
                        </button>;
            })}
            </div>
        </div>

    );
}
export default AdminMenu;
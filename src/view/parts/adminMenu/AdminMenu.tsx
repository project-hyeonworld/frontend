import React, {useEffect, useState} from "react";

import InitPartyModal from "./initParty/InitPartyModal";
import OpenModal from "./open/OpenModal";
import UserModal from "./user/UserModal";
import {
    AdminDoneAxios,
    ChangeCurrentGameStageAxios,
    GetCurrentRoundAxios,
    InitRoundAxios
} from "../adminMenu/AdminMenuAPI";
import {usePartyContext} from "context/party/PartyContext";
import {useGameContext} from "../../../context/game/GameContext";
import {useAdminContext} from "../../../context/admin/AdminContext";

interface Game{
    id: number;
    name: string;
}

const MINIMUM_STAGE_VALUE = 1;
const MAXIMUM_STAGE_VALUE = 8;
const DONE_INDEX = 9;

export const AdminMenuList = {
    InitParty: 0,
    Open: 1,
    Tutorial: 2,
    Submit: 3,
    Check: 4,
    Show: 5,
    Play: 6,
    Result: 7,
    Ranking: 8,
    Done: DONE_INDEX,
    User: 10,
};



function AdminMenu (){

    const adminContext = useAdminContext("AdminMenu")
    const partyContext = usePartyContext("AdminMenu");
    const gameContext = useGameContext("AdminMenu");

    const [initPartyModal, setInitPartyModal] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [memberModal, setMemberModal] = useState<boolean>(false);
    const [initRoundModal, setInitRoundModal] = useState<boolean>(false);

    const {roundId, setRoundId} = adminContext;
    const {gameId, gameStage} = gameContext;
    const {partyId} = partyContext;





    useEffect(() => {
        GetCurrentRoundAxios(partyId, handleRoundId);
    }, [roundId]);

    const handleRoundId = (roundId: number|null) => {
        setRoundId(roundId);
    }

    const commitInitRound = () => {
        InitRoundAxios(partyId, gameId, handleRoundId);
    }

    const onInitParty = () => {
        setInitPartyModal(!initPartyModal);
    }
    const onOpen = () => {
        setOpenModal(!openModal);
    }
    const onDone = () => {
        AdminDoneAxios();
    }
    const onMember = () => {
        setMemberModal(!memberModal);
    }
    const onInitRound = () => {
        setInitRoundModal(!initRoundModal);
    }



    const onClickButton = (event : React.MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLLIElement;
        const value : any = target.getAttribute("id");
        const parsedValue : number = parseInt(value);

        if (gameStage == DONE_INDEX && isWithinGameStage(parsedValue)) {
            commitInitRound();
        }

        changeGameStage(parsedValue);



        switch (parsedValue) {
            case AdminMenuList["InitParty"]:
                onInitParty();
                break;
            case AdminMenuList["Open"]:
                onOpen();
                break;
            case AdminMenuList["Done"]:
                onDone();
                break;
            case AdminMenuList["User"]:
                onMember();
                break;
            default:
                console.log("ㅁㄹ");
        }
    }



    const changeGameStage = (parsedValue: number) => {
        if (isWithinGameStage(parsedValue)) {
            ChangeCurrentGameStageAxios(partyId, parsedValue);
        }
    }

    const isWithinGameStage = (parsedValue: number) => {
        return MINIMUM_STAGE_VALUE <= parsedValue && parsedValue <= MAXIMUM_STAGE_VALUE;
    }

    return (
        <div className="AdminMenu">
            <div className={"grid grid-cols-5"}>
                {initPartyModal && <InitPartyModal onInit={onInitParty}/>}
                {openModal && <OpenModal onOpen={onOpen}/>}
                {memberModal && <UserModal onMember={onMember}/>}

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
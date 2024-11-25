import React, {useState} from "react";
import {OpenGameAxios} from "../open/OpenAPI";
import {usePartyContext} from "context/party/PartyContext";
import {useGameContext} from "../../../../context/game/GameContext";


interface Game{
    id: number;
    name: string;
}

interface OpenModalProps{
    onOpen : any;
}

const OpenModal = ( props: OpenModalProps) => {
    const partyContext = usePartyContext("OpenModal");
    const gameContext = useGameContext("OpenModal");
    const [openGame, setGame] = useState<number>(0);
    const [gameName, setName] = useState<string>("선택해주세요");

    const gameSlider = document.getElementById("game-slider");

    if (gameSlider){
        gameSlider.addEventListener('input', function(event) {
        });
    }
    if (!partyContext) {
        throw new Error('OpenModal must be used within a PartyProvider');
    }

    const {partyId, gameCollection} = partyContext;
    const {setGameId} = gameContext;


    const onOpenGame = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value =parseInt(event.target.value);
        setGame(value);
        setName(gameCollection[value].name);
    }

    const commitOpen = () => {
        console.log(gameName);
        OpenGameAxios(partyId, gameCollection[openGame].id);
        setGameId(gameCollection[openGame].id);
        props.onOpen();
    }


    return (
        <div className={"h-screen w-full fixed left-0 top-0 flex justify-center bg-black bg-opacity-70"}>
            <div className={"bg-white fixed top-1/3 rounded-2xl w-10/12 h-2/7"}>
                <div className={"border-b px-4 flex justify-between items-center"}>
                    <h3 className={"font-extrabold"}>Open</h3>
                </div>

                <label htmlFor="game-slider"
                       className="block mb-2 text-sm font-medium text-gray-900">
                </label>
                <input className={"text-center"} type={"text"} value={gameName} onChange={onOpenGame}></input>
                <input id="default-range" type="range" min={0} max={gameCollection.length-1}  onChange={onOpenGame} value={openGame}
                       className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />


                <div className={"border-b px-4 py-2 flex items-center"}/>
                <div className={"flex justify-center items-center w-100 py-2 text-gray-500"}>
                    <button onClick={commitOpen} className={"bg-red-600 hover:bg-red-700 rounded text-white mx-2"}>열기</button>
                    <button onClick={props.onOpen} className={"bg-gray-600 hover:bg-gray-700 rounded text-white"}>취소</button>
                </div>
            </div>
        </div>
    )
}
export default OpenModal;
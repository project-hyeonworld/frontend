import React, {useContext, useEffect} from 'react';

import {EnterGameAxios, GetGameStageListenerAxios} from "./GameAPI";
import {usePartyContext} from "../../../context/party/PartyContext";
import {GameContext} from "../../../context/game/GameContext";

import GameStrategy from "./interface/GameStrategy";

interface GameProps {
    gameId: number;
}

function Game(props : GameProps) {
    const partyContext = usePartyContext("Game");
    const gameContext = useContext(GameContext);
    const gameId = props.gameId;

    if (!gameContext) {
        throw new Error('Game must be used within an GameProvider');
    }

    const {partyId, setPartyId, userId, gameCollection} = partyContext;
    const {gameStage, setGameStage} = gameContext;

    useEffect(()=>{
        console.log("UPDATE")
        let gameStageListener : EventSource;
        const fetchGameStageListener = () => {
            EnterGameAxios(partyId, userId);
                setTimeout (()=> {
                    gameStageListener = GetGameStageListenerAxios(partyId, userId, handleChangeCurrentStage)
                }, 1000);
        }
        fetchGameStageListener();

        return () => {
            console.log("GAME Retunr");
            gameStageListener.close();
        }
    },[])

    const handleChangeCurrentStage = (stage : number) => {
        console.log("gameCHANGE");
        setGameStage(stage);
    }

    return (
        <div className="Game">
            <ul className="p-2 space-y-1"/>
            <div className="flex mx-2 items-center justify-center rounded-xl group sm:flex space-x-2">
                <GameStrategy gameId = {gameId}/>
            </div>

        </div>
    )
}



export default Game;
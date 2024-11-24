import React, {useEffect} from "react";
import {useGameContext} from "../../../../context/game/GameContext";
import GameStageStrategy from "../interface/GameStageStrategy";


export default function Game0() {
    const gameContext = useGameContext("Game0");

    const {gameStage} = gameContext;

    useEffect(() => {

    }, [gameStage]);

    return (
        <>
            <GameStageStrategy gameId={0} gameStage={gameStage}></GameStageStrategy>
        </>

    );
}
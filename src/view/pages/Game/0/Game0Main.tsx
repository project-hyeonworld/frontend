import React, {useContext, useEffect} from "react";
import {GameContext} from "../../../../context/game/GameContext";
import GameStageStrategy from "../interface/GameStageStrategy";


export default function Game0() {
    const gameContext = useContext(GameContext);

    if (!gameContext) {
        throw new Error('Game must be used within an GameProvider');
    }
    const {gameStage} = gameContext;

    useEffect(() => {

    }, [gameStage]);

    return (
        <>
            <GameStageStrategy gameId={0} gameStage={gameStage}></GameStageStrategy>
        </>

    );
}
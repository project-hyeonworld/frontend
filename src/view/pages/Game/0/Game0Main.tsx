import React, {useContext} from "react";
import {GameContext} from "../../../../context/game/GameContext";
import GameStageStrategy from "../interface/GameStageStrategy";


export default function Game0() {
    const gameContext = useContext(GameContext);

    if (!gameContext) {
        throw new Error('Game must be used within an GameProvider');
    }
    const {gameStage, setGameStage} = gameContext;

    return (
        <>
            <GameStageStrategy gameId={0} gameStage={gameStage}></GameStageStrategy>
        </>

    );
}
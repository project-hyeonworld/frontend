import React, {useEffect} from 'react';
import {Game0Stages, Game1Stages} from "../../../../model/GameStage";
import {useAdminContext} from "../../../../context/admin/AdminContext";

interface GameStageStrategyProps {
  gameId: number
  gameStage: number
}

interface GameStageStrategy {
  [key: number]: {[key : number] : any | null};
}

const GameStrategy = ( props : GameStageStrategyProps) => {
  const gameStages : GameStageStrategy = {
    0: Game0Stages(),
    1: Game1Stages()
  }
  const stage = gameStages[props.gameId][props.gameStage];
  useEffect(() => {

  }, [props.gameStage]);


  return (

      <div>
        {stage ? (<stage.component/>) : <p>no stage available</p>}
      </div>

  );
};

export default GameStrategy;

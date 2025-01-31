import React from 'react';
import {GameComponent} from "../../../../model/Game";

interface GameStrategyProps {
  gameId: number
}

const GameStrategy = ( props : GameStrategyProps) => {
  return (
      <div>
        {Object.entries(GameComponent).map(([gameName, gameComponent], index) => {
          if (props.gameId === index) {
            const GameComponent = gameComponent;
            return (
                <div key={index}>
                  <p>{gameName}</p>
                  <GameComponent key={index}/>
                </div>
            );
          }
        })}
      </div>
  );
};

export default GameStrategy;

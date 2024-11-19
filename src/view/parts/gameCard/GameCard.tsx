import {GameModel} from "../../../model/Game";
import React, {useContext} from "react";
import {PartyContext} from "../../../context/party/PartyContext";

interface GameCardProps {
  onClickGame: React.MouseEventHandler<HTMLLIElement> | undefined;
}

const GameCard = (props : GameCardProps) => {
  const partyContext = useContext(PartyContext);
  if (!partyContext) {
    throw new Error('Home must be used within a PartyProvider');
  }
  const {gameCollection} = partyContext;
  return (
      <ul className="cards">
        {gameCollection.map((game: GameModel, i: number) => {
          return <li id={i.toString()} className={"card" + i % 7} key={i} onClick={props.onClickGame}>
            <h3 className="card-title">{game.name}</h3>
            <ul className="p-2 space-y-1"/>
            {game.description}</li>
        })}
      </ul>

  )
}

export default GameCard;
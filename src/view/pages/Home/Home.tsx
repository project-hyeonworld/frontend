import React, {useEffect, useState} from 'react';
import {DisplayGameAxios, CurrentGameAxios} from "./HomeAPI";
import './Home.css';


import MenuBar from "../../parts/menuBar/MenuBar";

import Game from "../Game/Game";
import AdminMenu from "../../parts/adminMenu/AdminMenu";
import {Special} from "configuration/special/SpecialConfig";
import {usePartyContext} from "context/party/PartyContext";
import {ExitGameAxios} from "../Game/GameAPI";
import GameProvider from "context/game/GameContext";
import AdminProvider from "context/admin/AdminContext";
import {GameModel} from "model/Game";
import GameCard from 'view/parts/gameCard/GameCard';

interface HomeProps {
  partyId: number;
  userId: number;
  userName: string;
}

function Home(props: HomeProps) {
  const partyContext = usePartyContext("Home");
  const [enterGameId, setEnterGameId] = useState<number>();
  const [currentGameId, setCurrentGameId] = useState<number>();
  const special = new Special();

  const {partyId, setPartyId, userId, setUserId, userName, setUserName, setGameCollection} = partyContext;

  useEffect(() => {
    console.log('Home useEffect', new Date().getTime());
    setPartyId(props.partyId);
    setUserId(props.userId);
    setUserName(props.userName);

    function getGameCollection(games: GameModel[]) {
      handleGameCollection(games);
    }

    DisplayGameAxios(getGameCollection);
  }, [])

  useEffect(() => {
  }, [partyId]);

  const handleGameCollection = (games: GameModel[]) => {
    setGameCollection(games);
  };

  const setEnterGame = (id: number) => {
    console.log('openGame called', new Date().getTime());
    setEnterGameId(id);
  }

  const onClickGame = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('onClickGame called', new Date().getTime());
    const target = event.target as HTMLLIElement;
    const value: any = target.getAttribute("id");
    if (partyId !== -1) {
      console.log("SETT");
      CurrentGameAxios(partyId, setCurrentGameId);
      setEnterGame(value);
    }

  }

  const onClickBack = () => {
    if (enterGameId) {
      ExitGameAxios(userId);
    }
    setEnterGameId(undefined);
    if (partyId !== -1) {
      CurrentGameAxios(partyId, setCurrentGameId);
    }
  }


  // @ts-ignore
  return (
      <div className="Home">
        <p>{userName}+{partyId}</p>
        <MenuBar moveBack={onClickBack}/>
        <ul className="p-2 space-y-1"/>

          <GameProvider>
            <AdminProvider>
        <div
            className="flex mx-2 items-center justify-center rounded-xl party sm:flex space-x-2 space-y-0.1 bg-white bg-opacity-20 shadow-xl hover:rounded-2xl">
          {(enterGameId) && (enterGameId === currentGameId) ? (

                    <Game gameId={currentGameId}/>

              )
              : <GameCard onClickGame={onClickGame}></GameCard>}

        </div>

        {special.adminId === userId &&

                <AdminMenu/>

            }
            </AdminProvider>
          </GameProvider>

      </div>
  );
}

export default Home;
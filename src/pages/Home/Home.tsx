import React, {useContext, useEffect, useState} from 'react';
import {DisplayGameAxios, CurrentGameAxios} from "./HomeAPI";
import './Home.css';


import MenuBar from "../../parts/menuBar/MenuBar";

import Game from "../Game/Game";
import AdminMenu from "../../parts/adminMenu/AdminMenu";
import {Special} from "../../configuration/special/SpecialConfig";
import {PartyContext} from "../../context/party/PartyContext";
import {ExitGameAxios} from "../Game/GameAPI";
import GameProvider from "../../context/game/GameContext";

interface HomeProps{
    partyId: number;
    userId: number;
    userName: string;
}

interface Game {
    name: string;
    description: string;
}

interface GameWithId extends Game {
    id : number;
}

function Home (props : HomeProps){
    const partyContext = useContext(PartyContext);
    const [gameList, setGameList] = useState <GameWithId[]>([]);
    const [enterGameId, setEnterGameId] = useState <number> (-1);
    const [currentGameId, setCurrentGameId] = useState <number> (-2);
    const special = new Special();
    if (!partyContext) {
        throw new Error('Home must be used within a PartyProvider');
    }
    const {partyId, setPartyId, userId, setUserId, userName, setUserName} = partyContext;

    useEffect(()=>{
        setPartyId(props.partyId);
        setUserId(props.userId);
        setUserName(props.userName);
        function getGameList (games : Game[]){
            function mapGameToGameWithId(game: Game, id: number) {
                return {
                    id: id,
                    name: game.name,
                    description: game.description
                }
            }

            setGameList(games.map((game, index) => mapGameToGameWithId(game, index)));
        }
        DisplayGameAxios (getGameList);
    },[])

    useEffect(() => {
    }, [partyId]);

    const openGame = (id : number) => {
        setEnterGameId(id);
    }

    const onClickGame = (event : React.MouseEvent<HTMLLIElement>) => {
        const target = event.target as HTMLLIElement;
        const value : any = target.getAttribute("id");
        if (partyId != -1) {
            CurrentGameAxios(partyId, setCurrentGameId);
        }
        console.log("커렌"+currentGameId);
        console.log("선택"+enterGameId);
        openGame(value);
    }

    const onClickBack = () => {
        if (enterGameId != -1)
            ExitGameAxios(userId);
        setEnterGameId(-1);
        CurrentGameAxios(partyId, setCurrentGameId);
    }

    // @ts-ignore
    return (
        <div className="Home">
            <p>{userName}+{partyId}</p>
            <MenuBar moveBack={onClickBack}/>
            <ul className="p-2 space-y-1"/>
            <div className="flex mx-2 items-center justify-center rounded-xl party sm:flex space-x-2 space-y-0.1 bg-white bg-opacity-20 shadow-xl hover:rounded-2xl">
                {enterGameId == currentGameId ?(
                    <GameProvider>
                        <Game gameId={currentGameId} stage={0}/>
                    </GameProvider>
                    )
                : <ul className="cards">
                    {gameList.map((game: GameWithId, i: number) => {
                        return <li id={i.toString()} className={"card"+i%7} key={i} onClick={onClickGame}>
                            <h3 className="card-title">{game.name}</h3>
                            <ul className="p-2 space-y-1"/>
                            {game.description}</li>
                    })}
                </ul>}

            </div>
            {special.adminId === userId && <AdminMenu gameList={gameList}/>}
        </div>
    );
}

export default Home;
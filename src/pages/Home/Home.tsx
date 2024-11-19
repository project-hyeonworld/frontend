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
    partyId: number | null;
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
    const [enterGameId, setEnterGameId] = useState <number|null> (null);
    const [currentGameId, setCurrentGameId] = useState <number|null> (null);
    const special = new Special();
    if (!partyContext) {
        throw new Error('Home must be used within a PartyProvider');
    }
    const {partyId, setPartyId, userId, setUserId, userName, setUserName} = partyContext;

    useEffect(()=>{
        console.log('Home useEffect', new Date().getTime());
        if (props.partyId) {
            setPartyId(props.partyId);
        }
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
        console.log('openGame called', new Date().getTime());
        setEnterGameId(id);
    }

    const onClickGame = (event : React.MouseEvent<HTMLLIElement>) => {
        event.preventDefault();
        event.stopPropagation();
        console.log('onClickGame called', new Date().getTime());
        const target = event.target as HTMLLIElement;
        const value : any = target.getAttribute("id");
        if (partyId) {
            CurrentGameAxios(partyId, setCurrentGameId);
        }
        if (currentGameId == value) {
            openGame(value);
        }
    }

    const onClickBack = () => {
        if (enterGameId != null) {
            ExitGameAxios(userId);
        }
        setEnterGameId(null);
        CurrentGameAxios(partyId, setCurrentGameId);
    }

    // @ts-ignore
    return (
        <div className="Home">
            <p>{userName}+{partyId}</p>
            <MenuBar moveBack={onClickBack}/>
            <ul className="p-2 space-y-1"/>
            <div className="flex mx-2 items-center justify-center rounded-xl party sm:flex space-x-2 space-y-0.1 bg-white bg-opacity-20 shadow-xl hover:rounded-2xl">
                {enterGameId !== null && currentGameId !== null ?(
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
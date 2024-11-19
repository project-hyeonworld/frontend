import { GameWithId } from "model/Game";
import React, {createContext, ReactNode, useState,} from "react";

interface PartyContextProps {
  partyId: number;
  setPartyId: React.Dispatch<React.SetStateAction<number>>;
  userId: number;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  gameCollection: GameWithId[]
  setGameCollection: React.Dispatch<React.SetStateAction<GameWithId[]>>
}

export const PartyContext = createContext<PartyContextProps | undefined> (undefined);

const PartyProvider: React.FC<{children: ReactNode}> = ({children}) => {

  const [partyId, setPartyId] = useState<number>(-1);
  const [userId, setUserId] = useState<number>(-2);
  const [userName, setUserName] = useState<string>('');
  const [gameCollection, setGameCollection] = useState<GameWithId[]>([]);
  return (
      <PartyContext.Provider value = {{partyId, setPartyId, userId, setUserId, userName, setUserName, gameCollection, setGameCollection}}>
        {children}
      </PartyContext.Provider>
  );
};

export default PartyProvider;
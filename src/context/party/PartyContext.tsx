import { GameModel} from "model/Game";
import React, {createContext, ReactNode, useContext, useState,} from "react";

interface PartyContextProps {
  partyId: number;
  setPartyId: React.Dispatch<React.SetStateAction<number>>;
  userId: number;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  gameCollection: GameModel[]
  setGameCollection: React.Dispatch<React.SetStateAction<GameModel[]>>;
  content: string | undefined;
  setContent: React.Dispatch<React.SetStateAction<string|undefined>>;
  formatContent: React.JSX.Element[] | undefined;
  setFormatContent: React.Dispatch<React.SetStateAction<React.JSX.Element[] | undefined>>;
}

export const PartyContext = createContext<PartyContextProps | undefined> (undefined);

export const usePartyContext = (componentName : string) => {
  const partyContext = useContext(PartyContext);
  if (!partyContext) {
    throw new Error(`${componentName} must be used within a PartyProvider`);
  }
  return partyContext;
}

const PartyProvider: React.FC<{children: ReactNode}> = ({children}) => {

  const [partyId, setPartyId] = useState<number>(-1);
  const [userId, setUserId] = useState<number>(-2);
  const [userName, setUserName] = useState<string>('');
  const [gameCollection, setGameCollection] = useState<GameModel[]>([]);
  const [content, setContent] = useState<string>();
  const [formatContent, setFormatContent] = useState<React.JSX.Element[]>();

  return (
      <PartyContext.Provider value = {{partyId, setPartyId, userId, setUserId, userName, setUserName, gameCollection, setGameCollection, content, setContent, formatContent, setFormatContent}}>
        {children}
      </PartyContext.Provider>
  );
};

export default PartyProvider;
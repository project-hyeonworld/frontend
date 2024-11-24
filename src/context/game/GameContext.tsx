import React, {createContext, ReactNode, useContext, useState,} from "react";

interface GameContextProps {
  gameId: number | null;
  setGameId: React.Dispatch<React.SetStateAction<number | null>>;
  eventSource: EventSource | null;
  setEventSource: React.Dispatch<React.SetStateAction<EventSource | null>>;
  gameStage: number;
  setGameStage: React.Dispatch<React.SetStateAction<number>>;
}

export const GameContext = createContext<GameContextProps | undefined>(undefined);

export const useGameContext = (componentName: string) => {
  const gameContext = useContext(GameContext);
  if (!gameContext) {
    throw new Error(`${componentName} must be used within a GameProvider`);
  }
  return gameContext;
}

const GameProvider: React.FC<{ children: ReactNode }> = ({children}) => {

  const [gameId, setGameId] = useState<number | null>(null);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const [gameStage, setGameStage] = useState<number>(0);

  const closeDashboardListener = () => {
    if (eventSource) {
      eventSource.close();
      setEventSource(null);
    }
  }

  return (
      <GameContext.Provider value={{gameId, setGameId, eventSource, setEventSource, gameStage, setGameStage}}>
        {children}
      </GameContext.Provider>
  );
};

export default GameProvider;
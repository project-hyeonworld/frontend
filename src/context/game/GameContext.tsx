import React, {createContext, ReactNode, useState,} from "react";

interface GameContextProps {
  eventSource: EventSource | null;
  setEventSource: React.Dispatch<React.SetStateAction<EventSource | null>>;
  gameStage: number;
  setGameStage: React.Dispatch<React.SetStateAction<number>>;
}

export const GameContext = createContext<GameContextProps | undefined> (undefined);

const GameProvider: React.FC<{children: ReactNode}> = ({children}) => {

  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const [gameStage, setGameStage] = useState<number>(0);

  const closeDashboardListener = () => {
    if (eventSource) {
      eventSource.close();
      setEventSource(null);
    }
  }

  return (
      <GameContext.Provider value = {{eventSource, setEventSource, gameStage, setGameStage}}>
        {children}
      </GameContext.Provider>
  );
};

export default GameProvider;
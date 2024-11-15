import React, {createContext, ReactNode, useState,} from "react";

interface PartyContextProps {
  partyId: number;
  setPartyId: React.Dispatch<React.SetStateAction<number>>;
}

export const PartyContext = createContext<PartyContextProps | undefined> (undefined);

const PartyProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [partyId, setPartyId] = useState<number>(-1);
  return (
      <PartyContext.Provider value = {{partyId, setPartyId}}>
        {children}
      </PartyContext.Provider>
  );
};

export default PartyProvider;
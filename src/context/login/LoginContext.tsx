import React, {createContext, ReactNode, useState,} from "react";

interface LoginContextProps {
  partyId: number;
  setPartyId: React.Dispatch<React.SetStateAction<number>>;
  userId: number;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  login: boolean
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginContext = createContext<LoginContextProps | undefined> (undefined);

const LoginProvider: React.FC<{children: ReactNode}> = ({children}) => {

  const [partyId, setPartyId] = useState<number>(-1);
  const [userId, setUserId] = useState<number>(-2);
  const [userName, setUserName] = useState<string>('');
  const [login, setLogin] = useState<boolean>(false);
  return (
      <LoginContext.Provider value = {{partyId, setPartyId, userId, setUserId, userName, setUserName, login, setLogin}}>
        {children}
      </LoginContext.Provider>
  );
};

export default LoginProvider;
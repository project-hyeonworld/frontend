import React, {createContext, ReactNode, useState,} from "react";

interface LoginContextProps {
  login: boolean
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginContext = createContext<LoginContextProps | undefined> (undefined);

const LoginProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [login, setLogin] = useState<boolean>(false);
  return (
      <LoginContext.Provider value = {{login, setLogin}}>
        {children}
      </LoginContext.Provider>
  );
};

export default LoginProvider;
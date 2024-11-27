import React, {createContext, ReactNode, useContext, useState,} from "react";

interface LoginContextProps {
  login: boolean
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginContext = createContext<LoginContextProps | undefined> (undefined);

export const useLoginContext = (componentName: string) => {
  const loginContext = useContext(LoginContext);
  if (!loginContext) {
    throw new Error(`${componentName} must be used within a LoginProvider`);
  }
  return loginContext;
}

const LoginProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [login, setLogin] = useState<boolean>(false);
  return (
      <LoginContext.Provider value = {{login, setLogin}}>
        {children}
      </LoginContext.Provider>
  );
};

export default LoginProvider;
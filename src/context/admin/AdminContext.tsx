import React, {createContext, ReactNode, useContext, useState,} from "react";

interface AdminContextProps {
  roundId: number | null
  setRoundId: React.Dispatch<React.SetStateAction<number | null>>;

}

export const AdminContext = createContext<AdminContextProps | undefined>(undefined);

export const useAdminContext = (componentName: string) => {
  const adminContext = useContext(AdminContext);
  if (!adminContext) {
    throw new Error(`${componentName} must be used within a AdminProvider`);
  }
  return adminContext;
}

const AdminProvider: React.FC<{ children: ReactNode }> = ({children}) => {

  const [roundId, setRoundId] = useState<number | null>(null);

  return (
      <AdminContext.Provider value={{roundId, setRoundId}}>
        {children}
      </AdminContext.Provider>
  );
};
export default AdminProvider;
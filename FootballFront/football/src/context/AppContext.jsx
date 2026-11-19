import { createContext, useState } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const initialValue = {
    user,
    setUser,
  };

  return (
    <AppContext.Provider value={initialValue}>{children}</AppContext.Provider>
  );
};
export default AppContext;

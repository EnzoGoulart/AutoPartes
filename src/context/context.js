import { createContext, useReducer, useState } from "react";
export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: null,
    nome: null, 
    email: null,
    senha: null, 
    foto: undefined,
    configs: {
      getHome: 0
    }
  });
  let id = localStorage.getItem("idPost");
 
    return (
    <Context.Provider
      value={{
        user,
        setUser
      }}
    >
      {children}
    </Context.Provider>
  );
};
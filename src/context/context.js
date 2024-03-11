import { createContext, useReducer, useState } from "react";
export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    nome: null, 
    email: null,
    senha: null, 
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
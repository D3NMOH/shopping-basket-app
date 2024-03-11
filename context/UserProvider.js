import React, { useState, createContext } from "react";

export const UserContext = createContext(); // Обратите внимание на экспорт

export const UserProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [logged, setLogged] = useState(0);
  function logIn(userName) {
    setName(userName);
  }
  function logOut() {
    setName("");
  }
  return (
    <UserContext.Provider
      value={{ name, logIn, logged: name.length > 0, logOut }}
    >
      {children}
    </UserContext.Provider>
  );
};

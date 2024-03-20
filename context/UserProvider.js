import React, { useState, createContext } from "react";

export const UserContext = createContext(); // Обратите внимание на экспорт

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [logged, setLogged] = useState(0);
  const [promocode, setPromocode] = useState("");
  const [userId, setUserId] = useState("");

  const logIn = (name, id) => {
    setUserName(name);
    setUserId(id);
  };

  function logOut() {
    setUserName("");
    setUserId("");
  }

  return (
    <UserContext.Provider
      value={{
        userName,
        logIn,
        logged: userName.length > 0,
        logOut,
        promocode,
        setPromocode,
        userId,
        setUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

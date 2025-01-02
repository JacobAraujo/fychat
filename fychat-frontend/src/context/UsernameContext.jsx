import React, { createContext, useEffect,  useState, useContext } from "react";

const UsernameContext = createContext();

export const UsernameProvider = ({ children }) => {
  const [username, setUsername] = useState("");

  const updateUsername = (newUsername) => {
    localStorage.setItem("username", newUsername); 
    setUsername(newUsername);
  };

  return (
    <UsernameContext.Provider value={{ username, updateUsername }}>
      {children}
    </UsernameContext.Provider>
  );
};

export const useUsername = () => {
  return useContext(UsernameContext);
};

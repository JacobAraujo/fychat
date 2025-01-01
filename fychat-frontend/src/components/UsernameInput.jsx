import React, { useEffect } from "react";
import { useUsername } from "../context/UsernameContext";

const UsernameInput = () => {
  const { username, updateUsername } = useUsername(); 

  useEffect(() => {
    if (!username) {
      const defaultUsername = `user${Math.floor(1000 + Math.random() * 9000)}`;
      updateUsername(defaultUsername);
    }
  }, [username, updateUsername]);
  

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        placeholder="Digite seu nome de usuário"
        value={username} 
        onChange={(e) => updateUsername(e.target.value)} 
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export default UsernameInput;

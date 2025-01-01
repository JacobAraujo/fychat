import React from "react";
import { Link } from "react-router-dom";
import UsernameInput from "../components/UsernameInput";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-blue-700 text-white">
      <h1 className="text-4xl font-bold mb-6">Bem-vindo ao Chat</h1>

      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 text-gray-800">
        <UsernameInput />
      </div>

      <div className="mt-10 flex space-x-4">
        <Link
          to="/create-group"
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 shadow-lg transform hover:scale-105 flex items-center justify-center"
        >
          Criar Grupo
        </Link>
        <Link
          to="/public-groups"
          className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition duration-300 shadow-lg transform hover:scale-105 flex items-center justify-center"
        >
          Ver Grupos Públicos
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsername } from "../context/UsernameContext";

const PerfilSetup = () => {
    const [tempUsername, setTempUsername] = useState("");
    const { updateUsername } = useUsername();
    const navigate = useNavigate();

    const handleSetUsername = () => {
        if (tempUsername.trim()) {
            updateUsername(tempUsername);
            navigate(-1); 
        } else {
            alert("Por favor, insira um nome de usuário válido.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">Configurar Nome de Usuário</h2>
            <input
                type="text"
                placeholder="Digite seu nome de usuário"
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value)}
                className="w-full max-w-sm px-4 py-2 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
                onClick={handleSetUsername}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600"
            >
                Confirmar
            </button>
        </div>
    );
};

export default PerfilSetup;

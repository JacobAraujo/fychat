import React, { useState } from "react";
import { Link } from "react-router-dom";

const CreateGroup = () => {
    const [groupName, setGroupName] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [groupLink, setGroupLink] = useState("");

    const handleCreateGroup = async () => {
        if (!groupName.trim()) {
            alert("Por favor, insira um nome para o grupo.");
            return;
        }

        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

        try {
            const response = await fetch(`${API_BASE_URL}/api/chat/groups`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chatName: groupName,
                    chatType: isPublic,
                }),
            });

            if (!response.ok) {
                throw new Error("Erro ao criar o grupo.");
            }

            const data = await response.json();
            const baseURL = window.location.origin;
            setGroupLink(`${baseURL}/chat/${data.linkToken}`);
        } catch (error) {
            console.error("Erro ao criar grupo:", error);
        }
    };

    const handleCopyLink = () => {
        if (groupLink) {
            navigator.clipboard.writeText(groupLink).then(() => {
                alert("Link copiado para a área de transferência!");
            }).catch(() => {
                alert("Erro ao copiar o link.");
            });
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-bold text-gray-700 mb-6">Criar Novo Grupo</h2>
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                <input
                    type="text"
                    placeholder="Nome do grupo"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        checked={isPublic}
                        onChange={(e) => setIsPublic(e.target.checked)}
                        className="mr-2"
                    />
                    <label className="text-gray-600">Grupo público</label>
                </div>
                <button
                    onClick={handleCreateGroup}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 shadow-lg transform hover:scale-105"
                >
                    Criar Grupo
                </button>
                {groupLink && (
                    <div className="mt-4 p-4 bg-blue-100 rounded">
                        <p className="text-blue-800">Grupo criado com sucesso!</p>
                        <Link
                            to={groupLink.replace(`${window.location.origin}`, "")}
                            className="block text-blue-500 underline mb-2"
                        >
                            Acesse seu grupo aqui
                        </Link>
                        <button
                            onClick={handleCopyLink}
                            className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300 shadow-lg transform hover:scale-105"
                        >
                            Copiar Link
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateGroup;

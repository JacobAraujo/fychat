import React, { useEffect, useState, useRef } from "react";
import { Client } from "@stomp/stompjs";
import { useNavigate } from "react-router-dom";
import { useUsername } from "../context/UsernameContext";

const Chat = ({ tokenLink }) => {
    const { username } = useUsername();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const client = useRef(null);

    useEffect(() => {
        if (!username) {
            navigate("/setup-perfil");
        } else {
            setLoading(false); 
        }
    }, [username, navigate]);

    useEffect(() => {
        if (loading) return; 

        client.current = new Client();
        client.current.configure({
            brokerURL: `wss://${window.location.host}/ws`,
            onConnect: () => {
                client.current.subscribe(`/topic/group/${tokenLink}`, (message) => {
                    const receivedMessage = JSON.parse(message.body);
                    setMessages((prev) => [...prev, receivedMessage]);
                });
            },
        });
        client.current.activate();

        return () => {
            client.current.deactivate();
        };
    }, [tokenLink, loading]);

    const sendMessage = () => {
        if (!newMessage.trim()) return;

        const message = {
            content: newMessage.trim(),
            sender: username,
        };

        client.current.publish({
            destination: `/app/sendMessage/${tokenLink}`,
            body: JSON.stringify(message),
        });

        setNewMessage("");
    };

    const handleCopyLink = () => {
        const groupLink = `${window.location.origin}/chat/${tokenLink}`;
        navigator.clipboard.writeText(groupLink)
            .then(() => {
                alert("Link copiado para a área de transferência!");
            })
            .catch(() => {
                alert("Erro ao copiar o link.");
            });
    };

    if (loading) {
        // Renderizar um placeholder enquanto a verificação ocorre
        return (
            <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
                <p className="text-gray-500 text-xl">Carregando...</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
            <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Chat do Grupo</h2>
                    <button
                        onClick={handleCopyLink}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200"
                    >
                        Copiar Link
                    </button>
                </div>
                <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-100 max-h-96 overflow-y-auto">
                    {messages.length > 0 ? (
                        messages.map((msg, index) => (
                            <div
                                key={index}
                                className="mb-3 p-2 bg-white rounded-lg shadow-sm border border-gray-200"
                            >
                                <span className="font-semibold text-blue-700">{msg.sender}</span>:{" "}
                                <span className="text-gray-800">{msg.content}</span>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">Nenhuma mensagem ainda. Comece a conversar!</p>
                    )}
                </div>
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") sendMessage();
                        }}
                        placeholder="Digite sua mensagem"
                        className="flex-grow border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all duration-200"
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;

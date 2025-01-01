import React, { useEffect, useState, useRef } from "react";
import { Client } from "@stomp/stompjs";
import { useUsername } from "../context/UsernameContext";

const Chat = ({ groupId }) => {
    const { username } = useUsername();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const client = useRef(null);

    useEffect(() => {
        client.current = new Client();
        client.current.configure({
            brokerURL: "ws://localhost:8080/ws",
            onConnect: () => {
                client.current.subscribe(`/topic/group/${groupId}`, (message) => {
                    const receivedMessage = JSON.parse(message.body);
                    setMessages((prev) => [...prev, receivedMessage]);
                });
            },
        });
        client.current.activate();

        return () => {
            client.current.deactivate();
        };
    }, [groupId]);

    const sendMessage = () => {
        if (!newMessage.trim()) return;

        const message = {
            content: newMessage.trim(),
            sender: username,
        };

        client.current.publish({
            destination: `/app/sendMessage/${groupId}`,
            body: JSON.stringify(message),
        });

        setNewMessage("");
    };

    return (
        <div className="p-6">
            <ul className="max-h-80 overflow-y-auto">
                {messages.map((msg, index) => (
                    <li key={index}>
                        <b>{msg.sender}</b>: {msg.content}
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") sendMessage();
                }}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            />
            <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2">
                Enviar
            </button>
        </div>
    );
};

export default Chat;

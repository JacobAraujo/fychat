import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const GroupList = () => {
    const [groups, setGroups] = useState([]);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        fetch(`http://${API_BASE_URL}/api/chat/public-groups`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
            .then((response) => response.json())
            .then((data) => setGroups(data))
            .catch((error) => console.error("Erro ao buscar grupos públicos:", error));
    }, []);

    return (
        <div className="flex flex-col items-center mt-10">
            <h2 className="text-2xl font-bold mb-4">Grupos Públicos</h2>
            <ul className="w-full max-w-md bg-white rounded-lg shadow-md">
                {groups.map((group) => (
                    <li
                        key={group.id}
                        className="px-4 py-2 border-b border-gray-200 hover:bg-gray-100 transition duration-200"
                    >
                        <Link to={`/chat/${group.linkToken}`} className="text-blue-600 hover:underline">
                            {group.chatName}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GroupList;

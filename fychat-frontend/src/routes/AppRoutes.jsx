import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CreateGroup from "../components/CreateGroup";
import GroupList from "../components/GroupList";
import Chat from "../components/Chat";
import PerfilSetup from "../pages/PerfilSetup";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-group" element={<CreateGroup />} />
            <Route path="/public-groups" element={<GroupList />} />
            <Route path="/chat/:tokenLink" element={<ChatWrapper />} />
            <Route path="/setup-perfil" element={<PerfilSetup />} />
        </Routes>
    );
}

const ChatWrapper = () => {
    const { tokenLink } = useParams();
    return <Chat tokenLink={tokenLink} />;
};

export default AppRoutes;

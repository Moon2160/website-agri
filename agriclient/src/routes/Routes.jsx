import React from "react";
import { Routes, Route } from "react-router-dom";
import FarmerLogin from "../components/FarmerLogin";
import FarmerDashboard from "../components/FarmerDashboard";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<FarmerLogin />} />
            <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        </Routes>
    );
}
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ React Router যুক্ত করা হয়েছে
import NavBar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import InfoCards from "./components/InfoCards";
import Modules from "./components/Modules";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";
import FarmerRegister from "./pages/FarmerRegister"; // ✅ Farmer Registration পেজ
import BuyerRegister from "./pages/BuyerRegister"; // ✅ Buyer Registration পেজ
import AdminLogin from "./pages/AdminLogin"; // ✅ Admin Login পেজ
import BuyerLogin from "./pages/BuyerLogin"; // ✅ Buyer Login পেজ
import FarmerLogin from "./pages/FarmerLogin"; // ✅ Farmer Login পেজ
import FarmerDashboard from "./components/FarmerDashboard/FarmerDashboard";
import MarketDashboard from "./components/FarmerDashboard/MarketDashboard";
import CropsDashboard from "./components/FarmerDashboard/CropsDashboard";
import ReportDashboard from "./components/FarmerDashboard/ReportDashboard";


import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Bootstrap CSS ইমপোর্ট করা হয়েছে


function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* ✅ Homepage */}
        <Route path="/" element={
          <>
            <HeroSection />
            <InfoCards />
            <Modules />
            <HowItWorks />
          </>
        } />
        
        {/* ✅ Registration Pages */}
        <Route path="/register/farmer" element={<FarmerRegister />} />
        <Route path="/register/buyer" element={<BuyerRegister />} />

        {/* ✅ Login Pages */}
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/login/buyer" element={<BuyerLogin />} />
        <Route path="/login/farmer" element={<FarmerLogin />} />


       {/* ✅ Dashboard Pages */}
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        
       {/* ✅ Crop Dashboard Pages */}
        <Route path="/dashboard/crops" element={<CropsDashboard />} />

       {/* ✅ Report Dashboard Pages */}    
        <Route path="/dashboard/report" element={<ReportDashboard />} />

       {/* ✅ Market Dashboard Pages */} 
       <Route path="/dashboard/market" element={<MarketDashboard />} />



    
       </Routes>
      <Footer />
    </Router>
  );
}

export default App;
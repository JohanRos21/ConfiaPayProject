import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TrustScore from "./pages/TrustScore";
import AdminPanel from "./pages/AdminPanel";
import ValidatePayment from "./pages/ValidatePayment";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./styles/global.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/validate" element={<ValidatePayment />} />
            <Route path="/trustscore" element={<TrustScore />} />
            <Route path="/adminpanel" element={<AdminPanel />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

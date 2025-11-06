import React from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TrustScore from "./pages/TrustScore";
import AdminPanel from "./pages/AdminPanel";
import ValidatePayment from "./pages/ValidatePayment";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import VendedorTransaccion from "./pages/VendedorTransaccion";
import ValidacionesList from "./pages/ValidacionesList";
import TiendasList from "./pages/DuenoDashboard/TiendasList";
import VendedoresPorTienda from "./pages/DuenoDashboard/VendedoresPorTienda";

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
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/validate" element={<ProtectedRoute><ValidatePayment /></ProtectedRoute>} />
            <Route path="/trustscore" element={<ProtectedRoute><TrustScore /></ProtectedRoute>} />
            <Route path="/adminpanel" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
            <Route path="/vendedor" element={<ProtectedRoute><VendedorTransaccion /></ProtectedRoute>} />
            <Route path="/validaciones" element={<ProtectedRoute><ValidacionesList /></ProtectedRoute>} />
           <Route path="/tiendas" element={<ProtectedRoute><TiendasList /></ProtectedRoute>}/>
           <Route path="/vendedores/:tiendaId"element={<ProtectedRoute><VendedoresPorTienda /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

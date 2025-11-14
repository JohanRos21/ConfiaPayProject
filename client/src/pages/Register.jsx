import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("cliente");
  const [tienda, setTienda] = useState(""); // 🔹 nuevo campo
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("📦 Enviando registro con rol:", role, "y tienda:", tienda);

    try {
      const res = await axiosClient.post("/api/auth/register", {
        name,
        email,
        password,
        role,
        tienda, // 🔹 se envía al backend
      });

      alert("Registro exitoso ✅");
      navigate("/");
    } catch (error) {
      console.error("❌ Error al registrar:", error.response?.data || error);
      alert(error.response?.data?.message || "Error al registrar ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-green-100 to-green-300">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
          Crear cuenta
        </h2>

        {/* Nombre */}
        <input
          type="text"
          placeholder="Nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-green-500"
          required
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-green-500"
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-green-500"
          required
        />

        {/* Rol */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-green-500"
        >
          <option value="cliente">Cliente</option>
          <option value="vendedor">Vendedor</option>
          <option value="dueño">Dueño</option>
        </select>

        {/* Tienda (solo si es dueño o vendedor) */}
        {(role === "vendedor" || role === "dueño") && (
          <input
            type="text"
            placeholder="Nombre de la tienda o empresa"
            value={tienda}
            onChange={(e) => setTienda(e.target.value)}
            className="w-full p-3 mb-4 border rounded-lg focus:outline-green-500"
            required
          />
        )}

        {/* Botón */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Registrarme
        </button>
      </form>
    </div>
  );
}

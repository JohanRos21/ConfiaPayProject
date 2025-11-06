import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  // 🔹 Leer sesión y rol
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");
  const role = user?.role;

  // 🔹 Función de salida
  const salir = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/"; // fuerza recarga y redirige al login
  };

  return (
    <nav className="bg-blue-700 text-white py-4 px-8 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold tracking-wide">
        <Link to={token ? "/dashboard" : "/"}>ConfiaPay</Link>
      </h1>

      {/* Mostrar solo si hay sesión */}
      {token ? (
        <ul className="flex gap-6 text-sm items-center">
          <li className="hover:text-blue-200 cursor-pointer">
            <Link to="/dashboard">Dashboard</Link>
          </li>

          {/* 👇 Mostrar opción de validar solo para vendedor y dueño */}
          {(role === "vendedor" || role === "dueño") && (
            <li className="hover:text-blue-200 cursor-pointer">
              <Link to="/validate">Validar comprobante</Link>
            </li>
          )}

          <li className="hover:text-blue-200 cursor-pointer" onClick={salir}>
            Salir
          </li>
        </ul>
      ) : (
        // 🔹 Si no hay token, muestra solo opciones básicas
        <ul className="flex gap-6 text-sm items-center">
          <li className="hover:text-blue-200 cursor-pointer">
            <Link to="/">Iniciar sesión</Link>
          </li>
          <li className="hover:text-blue-200 cursor-pointer">
            <Link to="/register">Registrarse</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

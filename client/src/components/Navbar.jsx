import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user?.role;

  const salir = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="bg-blue-700 text-white py-4 px-8 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold tracking-wide">
        <Link to="/dashboard">ConfiaPay</Link>
      </h1>

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
    </nav>
  );
}

import React from "react";
export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white py-4 px-8 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold tracking-wide">ConfiaPay</h1>
      <ul className="flex gap-6 text-sm">
        <li className="hover:text-blue-200 cursor-pointer">Inicio</li>
        <li className="hover:text-blue-200 cursor-pointer">Dashboard</li>
        <li className="hover:text-blue-200 cursor-pointer">Salir</li>
      </ul>
    </nav>
  );
}

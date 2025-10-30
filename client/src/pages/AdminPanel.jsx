import React from "react";
export default function AdminPanel() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-100 to-gray-300">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Panel del Dueño 🧭</h1>
      <p className="text-gray-600 mb-4">
        Aquí podrás visualizar el rendimiento de tus locales, detectar irregularidades y revisar las validaciones de tus vendedores.
      </p>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-2">Estadísticas Generales</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Total de ventas verificadas: 124</li>
          <li>Alertas de fraude detectadas: 2</li>
          <li>Locales activos: 3</li>
        </ul>
      </div>
    </div>
  );
}

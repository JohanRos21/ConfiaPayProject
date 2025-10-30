import React from "react";
export default function ValidatePayment() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-blue-200">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Validar Comprobante</h1>
      <p className="text-gray-600 mb-6">
        Sube tu comprobante para verificar si es auténtico o falso.
      </p>
      <input
        type="file"
        accept="image/*"
        className="mb-4 border p-3 rounded-lg shadow-sm bg-white"
      />
      <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">
        Verificar
      </button>
    </div>
  );
}

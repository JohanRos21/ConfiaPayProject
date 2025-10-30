import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/transactions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(res.data);
      } catch (error) {
        console.error("Error al obtener transacciones:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-700 mb-2">
        Bienvenido, {user.name} 👋
      </h1>
      <p className="mb-6 text-gray-600">
        Rol: <span className="font-semibold">{user.role}</span>
      </p>

      {user.role === "cliente" && <ClienteView />}
      {user.role === "vendedor" && <VendedorView />}
      {user.role === "dueño" && <DuenioView transactions={transactions} />}
    </div>
  );
}

function ClienteView() {
  return <p>Valida tus comprobantes y pagos aquí 💳</p>;
}

function VendedorView() {
  return <p>Registra tus ventas y pagos 💼</p>;
}

function DuenioView({ transactions }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Transacciones registradas</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-blue-600 text-white text-left">
            <th className="p-3">Monto</th>
            <th className="p-3">Descripción</th>
            <th className="p-3">Tipo</th>
            <th className="p-3">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t._id} className="border-b hover:bg-gray-100">
              <td className="p-3">S/ {t.monto}</td>
              <td className="p-3">{t.descripcion}</td>
              <td className="p-3 capitalize">{t.tipo}</td>
              <td className="p-3">{new Date(t.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

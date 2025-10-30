import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
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

  return (
  <div className="mt-6 text-center">
        <p>Registra tus ventas y pagos 💼</p>
          <a
            href="/vendedor"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold"
          >
            Registrar nueva transacción
          </a>
          
    </div>
);
  
}

function DuenioView({ transactions }) {
  if (!transactions || transactions.length === 0) {
    return <p className="text-gray-500">No hay transacciones registradas.</p>;
  }

  // Agrupar datos por fecha
  const resumenPorDia = {};
  transactions.forEach((t) => {
    const fecha = new Date(t.createdAt).toLocaleDateString();
    if (!resumenPorDia[fecha]) {
      resumenPorDia[fecha] = { fecha, ingresos: 0, egresos: 0 };
    }
    if (t.tipo === "ingreso") resumenPorDia[fecha].ingresos += t.monto;
    else resumenPorDia[fecha].egresos += t.monto;
  });

  // Calcular balance por día
  const datosGrafico = Object.values(resumenPorDia).map((d) => ({
    ...d,
    balance: d.ingresos - d.egresos,
  }));

  // Calcular totales
  const totalIngresos = transactions
    .filter((t) => t.tipo === "ingreso")
    .reduce((acc, t) => acc + t.monto, 0);
  const totalEgresos = transactions
    .filter((t) => t.tipo === "egreso")
    .reduce((acc, t) => acc + t.monto, 0);
  const balanceTotal = totalIngresos - totalEgresos;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Dashboard Financiero Inteligente 💼
      </h2>

      {/* Totales */}
      <div className="grid grid-cols-3 gap-4 mb-8 text-center">
        <div className="p-4 bg-green-50 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Total Ingresos</p>
          <p className="text-2xl font-bold text-green-700">S/ {totalIngresos}</p>
        </div>
        <div className="p-4 bg-red-50 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Total Egresos</p>
          <p className="text-2xl font-bold text-red-700">S/ {totalEgresos}</p>
        </div>
        <div
          className={`p-4 rounded-lg shadow-sm ${
            balanceTotal >= 0 ? "bg-blue-50" : "bg-orange-50"
          }`}
        >
          <p className="text-sm text-gray-500">Balance Total</p>
          <p
            className={`text-2xl font-bold ${
              balanceTotal >= 0 ? "text-blue-700" : "text-orange-700"
            }`}
          >
            S/ {balanceTotal}
          </p>
        </div>
      </div>

      {/* 📊 Gráfico combinado: Ingresos, Egresos y Balance */}
      <div className="w-full min-h-[400px] mb-8">
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={datosGrafico}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="ingresos" fill="#22c55e" name="Ingresos (S/)" />
            <Bar dataKey="egresos" fill="#ef4444" name="Egresos (S/)" />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 6 }}
              name="Balance Diario"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* 📋 Tabla de detalle */}
      <h3 className="text-xl font-semibold mb-2 text-gray-700">
        Detalle de transacciones
      </h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-blue-600 text-white text-left">
            <th className="p-3">Fecha</th>
            <th className="p-3">Monto</th>
            <th className="p-3">Descripción</th>
            <th className="p-3">Tipo</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t._id} className="border-b hover:bg-gray-100">
              <td className="p-3">{new Date(t.createdAt).toLocaleDateString()}</td>
              <td className="p-3">S/ {t.monto}</td>
              <td className="p-3">{t.descripcion}</td>
              <td
                className={`p-3 capitalize ${
                  t.tipo === "ingreso" ? "text-green-700" : "text-red-700"
                }`}
              >
                {t.tipo}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
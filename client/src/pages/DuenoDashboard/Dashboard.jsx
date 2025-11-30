import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [sucursalesCount, setSucursalesCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Datos de transacciones solo para dueños
        if (user.role === "dueño") {
          const res = await axiosClient.get("/api/transactions");
          setTransactions(res.data);
        }

        // Número de sucursales
        const resSuc = await axiosClient.get(`/api/sucursales/tienda/${user.tienda}`);
        setSucursalesCount(resSuc.data.length);

      } catch (error) {
        console.error("Error al cargar dashboard:", error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-700 mb-2">
        Bienvenido, {user.name} 👋
      </h1>

      <p className="mb-6 text-gray-600">
        Rol: <span className="font-semibold">{user.role}</span>
      </p>

      {/* ---- Vista por rol ---- */}
      {user.role === "cliente" && <ClienteView />}
      {user.role === "vendedor" && <VendedorView />}
      {user.role === "dueño" && (
        <DuenioView 
          transactions={transactions} 
          sucursalesCount={sucursalesCount}
        />
      )}
    </div>
  );
}

/* --------------------------
      VISTA CLIENTE
---------------------------*/
function ClienteView() {
  return (
    <p>Valida tus comprobantes y pagos aquí 💳</p>
  );
}

/* --------------------------
      VISTA VENDEDOR
---------------------------*/
function VendedorView() {
  return (
    <div className="mt-6 text-center">
      <p>Registra tus ventas y pagos 💼</p>

      <Link
        to="/vendedor"
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold"
      >
        Registrar nueva transacción
      </Link>

      <Link
        to="/validate"
        className="inline-block mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Validar comprobante
      </Link>
    </div>
  );
}

/* --------------------------
      VISTA DUEÑO (NUEVA)
---------------------------*/
function DuenioView({ transactions, sucursalesCount }) {
  // Resumen rápido
  const ingresos = transactions
    .filter((t) => t.tipo === "ingreso")
    .reduce((acc, t) => acc + t.monto, 0);

  const egresos = transactions
    .filter((t) => t.tipo === "egreso")
    .reduce((acc, t) => acc + t.monto, 0);

  const balance = ingresos - egresos;

  return (
    <div>
      {/* --- Tarjetas Resumen --- */}
      <div className="grid grid-cols-3 gap-4 mb-8 text-center">
        <div className="bg-green-100 p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Ingresos</p>
          <p className="text-2xl font-bold text-green-700">S/ {ingresos}</p>
        </div>

        <div className="bg-red-100 p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Egresos</p>
          <p className="text-2xl font-bold text-red-700">S/ {egresos}</p>
        </div>

        <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Balance</p>
          <p className="text-2xl font-bold text-blue-700">S/ {balance}</p>
        </div>
      </div>

      {/* --- Sucursales --- */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Sucursales</h2>
        <p className="text-gray-600 mb-3">
          Tienes <strong>{sucursalesCount}</strong> sucursales registradas.
        </p>

        <Link
          to="/dashboard/sucursales"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold"
        >
          Gestionar sucursales
        </Link>
      </div>

      {/* --- Otras opciones --- */}
      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/validaciones"
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-3 rounded-lg text-center font-semibold"
        >
          Validar comprobantes
        </Link>

        <Link
          to="/trustscore"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg text-center font-semibold"
        >
          Análisis financiero
        </Link>
      </div>
    </div>
  );
}

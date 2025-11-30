import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { PlusCircle, Users, Store } from "lucide-react";
import toast from "react-hot-toast";

export default function SucursalesDashboard() {
  const { user } = useAuth();
  const [sucursales, setSucursales] = useState([]);

  const cargarSucursales = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axiosClient.get(
        `/api/sucursales/tienda/${user.tienda}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSucursales(res.data);
    } catch (err) {
      console.error(err);
      toast.error("No se pudieron cargar las sucursales");
    }
  };

  useEffect(() => {
    cargarSucursales();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">
        Gestión de Sucursales 🏬
      </h1>

      <p className="text-gray-600 mb-6">
        Aquí puedes gestionar las sucursales de tu tienda, crear nuevas y
        administrar sus responsables.
      </p>

      {/* BOTÓN CREAR SUCURSAL */}
      <Link
        to="/dashboard/sucursales/crear"
        className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 px-4 py-2 rounded-lg font-semibold mb-6 inline-block"
      >
        <PlusCircle size={20} /> Crear nueva sucursal
      </Link>

      {/* LISTA DE SUCURSALES */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {sucursales.map((s) => (
          <div
            key={s._id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <Store className="text-blue-600" size={26} />
              <h2 className="text-xl font-bold text-gray-800">{s.nombre}</h2>
            </div>

            <p className="text-gray-600 mb-1">
              📍 <strong>Dirección:</strong> {s.direccion}
            </p>

            <p className="text-gray-600 mb-4">
              📞 <strong>Teléfono:</strong> {s.telefono}
            </p>

            <div className="flex gap-3 mt-3">
              {/* Admins */}
              <Link
                to={`/dashboard/sucursales/${s._id}/admins`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center gap-2"
              >
                <Users size={18} /> Administradores
              </Link>

              {/* Vendedores */}
              <Link
                to={`/dashboard/sucursales/${s._id}/vendedores`}
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg flex items-center gap-2"
              >
                <Users size={18} /> Vendedores
              </Link>
            </div>
          </div>
        ))}
      </div>

      {sucursales.length === 0 && (
        <p className="text-gray-500 mt-6 text-center">
          Aún no tienes sucursales registradas.
        </p>
      )}
    </div>
  );
}

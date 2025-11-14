import React,{ useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import toast from "react-hot-toast";

export default function TiendasList() {
  const [tiendas, setTiendas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");

  const token = localStorage.getItem("token");

  // 🧠 Obtener las tiendas del dueño
  const obtenerTiendas = async () => {
    try {
      const res = await axiosClient.get("/api/tiendas/mis-tiendas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTiendas(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Error al obtener tiendas");
    }
  };

  // 🧠 Crear una nueva tienda
  const crearTienda = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/tiendas/crear",
        { nombre, direccion },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Tienda creada correctamente ✅");
      setNombre("");
      setDireccion("");
      obtenerTiendas();
    } catch (err) {
      console.error(err);
      toast.error("No se pudo crear la tienda ❌");
    }
  };

  useEffect(() => {
    obtenerTiendas();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Mis Tiendas</h2>

      <form onSubmit={crearTienda} className="flex gap-3 mb-6">
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre de la tienda"
          required
          className="border px-3 py-2 rounded w-1/2"
        />
        <input
          type="text"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          placeholder="Dirección"
          className="border px-3 py-2 rounded w-1/2"
        />
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
          Agregar
        </button>
      </form>

      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4">Nombre</th>
            <th className="py-2 px-4">Dirección</th>
            <th className="py-2 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tiendas.map((t) => (
            <tr key={t._id}>
              <td className="py-2 px-4">{t.nombre}</td>
              <td className="py-2 px-4">{t.direccion}</td>
              <td className="py-2 px-4">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => window.location.href = `/vendedores/${t._id}`}
                >
                  Ver vendedores
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

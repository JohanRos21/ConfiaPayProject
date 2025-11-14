import { useParams } from "react-router-dom";
import React,{ useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import toast from "react-hot-toast";

export default function VendedoresPorTienda() {
  const { tiendaId } = useParams();
  const token = localStorage.getItem("token");
  const [vendedores, setVendedores] = useState([]);
  const [nuevo, setNuevo] = useState({ name: "", email: "", password: "" });

  const cargarVendedores = async () => {
    try {
      const res = await axiosClient.get(`/api/usuarios/vendedores/${tiendaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVendedores(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Error al obtener vendedores");
    }
  };

  const registrarVendedor = async (e) => {
    e.preventDefault();
    try {
      await aaxiosClient.post(
        "/api/usuarios/registrar-vendedor",
        { ...nuevo, tiendaId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Vendedor registrado correctamente ✅");
      setNuevo({ name: "", email: "", password: "" });
      cargarVendedores();
    } catch (err) {
      console.error(err);
      toast.error("No se pudo registrar el vendedor ❌");
    }
  };

  useEffect(() => {
    cargarVendedores();
  }, [tiendaId]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Vendedores de esta tienda</h2>

      <form onSubmit={registrarVendedor} className="flex gap-3 mb-6">
        <input
          type="text"
          value={nuevo.name}
          onChange={(e) => setNuevo({ ...nuevo, name: e.target.value })}
          placeholder="Nombre"
          required
          className="border px-3 py-2 rounded w-1/3"
        />
        <input
          type="email"
          value={nuevo.email}
          onChange={(e) => setNuevo({ ...nuevo, email: e.target.value })}
          placeholder="Email"
          required
          className="border px-3 py-2 rounded w-1/3"
        />
        <input
          type="password"
          value={nuevo.password}
          onChange={(e) => setNuevo({ ...nuevo, password: e.target.value })}
          placeholder="Contraseña"
          required
          className="border px-3 py-2 rounded w-1/3"
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Registrar
        </button>
      </form>

      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4">Nombre</th>
            <th className="py-2 px-4">Correo</th>
          </tr>
        </thead>
        <tbody>
          {vendedores.map((v) => (
            <tr key={v._id}>
              <td className="py-2 px-4">{v.name}</td>
              <td className="py-2 px-4">{v.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

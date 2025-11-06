import { useEffect, useState } from "react";
import axios from "axios";

export default function ValidacionesList() {
  const [validaciones, setValidaciones] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/validacion/todas", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setValidaciones(res.data))
      .catch((err) => console.error("Error al obtener validaciones:", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Historial de Validaciones</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Fecha</th>
            <th className="py-2 px-4 border-b">Monto</th>
            <th className="py-2 px-4 border-b">Método</th>
            <th className="py-2 px-4 border-b">Resultado</th>
            <th className="py-2 px-4 border-b">Detalles</th>
            <th className="py-2 px-4 border-b">Vendedor</th>
            <th className="py-2 px-4 border-b">Tienda</th>
          </tr>
        </thead>
        <tbody>
        {validaciones.map((v) => (
            <tr key={v._id} className="text-center">
            <td className="py-2 px-4 border-b">{new Date(v.creadoEn).toLocaleString()}</td>
            <td className="py-2 px-4 border-b">S/ {v.monto.toFixed(2)}</td>
            <td className="py-2 px-4 border-b">{v.metodoPago}</td>
            <td className={`py-2 px-4 border-b font-semibold ${
                v.resultado === "valido" ? "text-green-600" :
                v.resultado === "sospechoso" ? "text-yellow-600" :
                "text-red-600"
            }`}>
                {v.resultado.toUpperCase()}
            </td>
            <td className="py-2 px-4 border-b">{v.detalles}</td>
            <td className="py-2 px-4 border-b">{v.vendedorId?.name || "Desconocido"}</td>
            <td className="py-2 px-4 border-b">{v.vendedorId?.tienda || "-"}</td>
            </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

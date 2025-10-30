import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  console.log("Intentando iniciar sesión con:", email, password);

  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });
    console.log("✅ Respuesta del servidor:", res.data);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    alert("Inicio de sesión exitoso ✅");
    navigate("/dashboard");
  } catch (error) {
    console.error("❌ Error al iniciar sesión:", error);
    alert("Error al iniciar sesión. Revisa la consola.");
  }
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-300">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          ConfiaPay
        </h2>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-blue-500"
          required
        />
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
          Ingresar
        </button>
        <p className="text-center text-sm mt-4">
          ¿No tienes cuenta?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Regístrate aquí
          </span>
        </p>
      </form>
    </div>
  );
}


import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verificarToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token)
      return res.status(401).json({ message: "Acceso denegado, token faltante" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔹 Busca el usuario completo en BD
    const usuario = await User.findById(decoded.id);
    if (!usuario)
      return res.status(404).json({ message: "Usuario no encontrado" });

    // 🔹 Inyecta todos los campos necesarios al request
    req.user = {
      id: usuario._id,
      role: usuario.role,
      tienda: usuario.tienda,
      tiendaId: usuario.tiendaId || null, // ✅ AGREGAR ESTO
      email: usuario.email,
      name: usuario.name,
    };

    next();
  } catch (error) {
    console.error("❌ Error en verificarToken:", error);
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};


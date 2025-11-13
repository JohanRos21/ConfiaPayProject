// server/controllers/userController.js
import User from "../models/User.js";
import Tienda from "../models/Tiendatem.js";
import bcrypt from "bcryptjs";

// ✅ Registrar un vendedor nuevo (solo para dueños)
export const registrarVendedor = async (req, res) => {
  try {
    const { name, email, password, tiendaId } = req.body;
    const dueñoId = req.user.id;

    // Verifica que la tienda pertenezca al dueño que está logueado
    const tienda = await Tienda.findOne({ _id: tiendaId, dueñoId });
    if (!tienda)
      return res
        .status(403)
        .json({ message: "No puedes registrar vendedores en una tienda que no te pertenece." });

    // Verifica si el correo ya existe
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente)
      return res.status(400).json({ message: "El correo ya está registrado." });

    // Encripta contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoVendedor = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "vendedor",
      tiendaId,
    });

    res.status(201).json({ success: true, vendedor: nuevoVendedor });
  } catch (error) {
    console.error("Error al registrar vendedor:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Listar vendedores por tienda (solo dueño)
export const obtenerVendedoresPorTienda = async (req, res) => {
  try {
    const dueñoId = req.user.id;
    const { tiendaId } = req.params;

    // Verifica que la tienda pertenezca al dueño
    const tienda = await Tienda.findOne({ _id: tiendaId, dueñoId });
    if (!tienda)
      return res.status(403).json({ message: "Acceso denegado." });

    const vendedores = await User.find({ tiendaId, role: "vendedor" }).select(
      "-password"
    );
    res.json(vendedores);
  } catch (error) {
    console.error("Error al obtener vendedores:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Obtener todos los usuarios (uso administrativo)
export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find().select("-password");
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Eliminar usuario
export const eliminarUsuario = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.json({ success: true, message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

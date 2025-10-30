import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body; // 👈 agregamos role
    const userExistente = await User.findOne({ email });
    if (userExistente) return res.status(400).json({ message: "El usuario ya existe" });

    const hashed = await bcrypt.hash(password, 10);
    const nuevoUsuario = new User({
      name,
      email,
      password: hashed,
      role: role || "cliente", // 👈 guarda el rol enviado o cliente por defecto
    });

    await nuevoUsuario.save();
    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await User.findOne({ email });
    if (!usuario) return res.status(400).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user: usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

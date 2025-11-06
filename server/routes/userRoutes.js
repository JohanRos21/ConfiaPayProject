// server/routes/userRoutes.js
import express from "express";
import { verificarToken } from "../middleware/authMiddleware.js";
import {
  registrarVendedor,
  obtenerVendedoresPorTienda,
  obtenerUsuarios,
  eliminarUsuario,
} from "../controllers/userController.js";

const router = express.Router();

// 🔹 Registrar un vendedor (solo dueño)
router.post("/registrar-vendedor", verificarToken, registrarVendedor);

// 🔹 Obtener vendedores por tienda (solo dueño)
router.get("/vendedores/:tiendaId", verificarToken, obtenerVendedoresPorTienda);

// 🔹 (opcional) Obtener todos los usuarios - uso administrativo
router.get("/todos", verificarToken, obtenerUsuarios);

// 🔹 Eliminar usuario (solo dueño/admin)
router.delete("/:userId", verificarToken, eliminarUsuario);

export default router;

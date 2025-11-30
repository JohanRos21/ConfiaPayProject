import express from "express";
import { crearTransaccion, obtenerTransacciones, obtenerEstadisticas 
} from "../controllers/transactionController.js";
import { verificarToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔹 Reportes y Estadísticas (NUEVO)
// Es importante poner esta ruta ANTES de cualquier ruta con "/:id"
router.get("/reporte/stats", verificarToken, obtenerEstadisticas);

// 🔹 Registrar una nueva transacción
router.post("/", verificarToken, crearTransaccion);

// 🔹 Obtener todas las transacciones (Con filtros)
router.get("/", verificarToken, obtenerTransacciones);

export default router;
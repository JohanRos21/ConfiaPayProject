// server/routes/validacionRoutes.js
import express from "express";
import { subirComprobante } from "../controllers/validacionController.js";
import { upload } from "../middleware/uploadMiddleware.js";
import { verificarToken } from "../middleware/authMiddleware.js"; // si ya usas JWT

const router = express.Router();

// Puedes protegerlo con JWT si lo deseas
router.post("/subir",verificarToken, upload.single("archivo"), subirComprobante);

export default router;

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import validacionRoutes from "./routes/validacionRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import tiendaRoutes from "./routes/tiendasRoutes.js";

dotenv.config();
const app = express();

app.options("*", cors());
// ===== CORS CONFIG (IMPORTANTE PARA VERCEL + RENDER) =====
const allowedOrigins = [
  "http://localhost:5173",
  "https://confia-payproject.vercel.app",  // 👈 TU FRONTEND EN PRODUCCIÓN
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ===== Middlewares =====
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ===== Conectar BD =====
connectDB()
  .then(() => console.log("📌 MongoDB conectado correctamente"))
  .catch((err) => console.error("❌ Error al conectar la BD:", err));

// ===== Rutas =====
app.get("/", (req, res) => {
  res.send("ConfiaPay Backend funcionando correctamente 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/validacion", validacionRoutes);
app.use("/api/usuarios", userRoutes);
app.use("/api/tiendas", tiendaRoutes);

// ===== Manejo de Rutas No Encontradas =====
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// ===== Manejo Global de Errores =====
app.use((error, req, res, next) => {
  console.error("❌ Error interno:", error);
  res.status(500).json({ error: "Error interno del servidor" });
});

// ===== Puerto dinámico para Render =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🔥 Servidor backend corriendo en puerto ${PORT}`)
);
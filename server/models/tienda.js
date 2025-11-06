// server/models/Tienda.js
import mongoose from "mongoose";

const tiendaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  direccion: { type: String },
  dueñoId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  creadaEn: { type: Date, default: Date.now },
});

export default mongoose.models.Tienda || mongoose.model("Tienda", tiendaSchema);

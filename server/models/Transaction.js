import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    tiendaId: { type: mongoose.Schema.Types.ObjectId, ref: "Tienda", required: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    monto: { type: Number, required: true },
    descripcion: { type: String },
    tipo: { type: String, enum: ["ingreso", "egreso"], default: "ingreso" },
    comprobante: { type: String }, // puede ser URL o texto
    tienda: { type: String, required: true }, // esto no se usa pero para evitar problemas xd
    fecha: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);

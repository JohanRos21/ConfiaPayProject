import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    monto: { type: Number, required: true },
    descripcion: { type: String },
    tipo: { type: String, enum: ["ingreso", "egreso"], default: "ingreso" },
    comprobante: { type: String }, // puede ser URL o texto
    tienda: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);

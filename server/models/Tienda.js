import mongoose from "mongoose";

const tiendaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    direccion: {
      type: String,
      trim: true,
      default: "",
    },
    telefono: {
      type: String,
      trim: true,
      default: "",
    },
    // Usuario dueño o encargado
    dueño: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    creadaEn: { type: Date, default: Date.now },
    // Si deseas agregar más datos de la tienda luego, puedes continuar aquí.
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Tienda", tiendaSchema);

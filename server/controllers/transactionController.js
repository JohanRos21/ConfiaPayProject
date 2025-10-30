import Transaction from "../models/Transaction.js";

// Crear transacción
export const crearTransaccion = async (req, res) => {
  try {
    const { monto, descripcion, tipo, comprobante } = req.body;

    const nueva = new Transaction({
      user: req.user.id, // viene del token
      monto,
      descripcion,
      tipo,
      comprobante
    });

    await nueva.save();
    res.status(201).json({ message: "Transacción registrada exitosamente", transaccion: nueva });
  } catch (error) {
    console.error("❌ Error al crear transacción:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// Obtener todas las transacciones del usuario logueado
export const obtenerTransacciones = async (req, res) => {
  try {
    const transacciones = await Transaction.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(transacciones);
  } catch (error) {
    console.error("❌ Error al obtener transacciones:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

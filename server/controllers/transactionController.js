import mongoose from "mongoose"; // Necesario para las estadísticas
import Transaction from "../models/Transaction.js";

// 1. Crear transacción (Tu código original, intacto)
export const crearTransaccion = async (req, res) => {
  try {
    const { monto, descripcion, tipo, comprobante } = req.body;

    const nueva = new Transaction({
      user: req.user.id,
      monto,
      descripcion,
      tipo,
      comprobante,
      tienda: req.user.tienda,
      sucursal: req.user.sucursal || null,
    });

    await nueva.save();
    res.status(201).json({ message: "Transacción registrada exitosamente", transaccion: nueva });
  } catch (error) {
    console.error("❌ Error al crear transacción:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// 2. Obtener transacciones (MODIFICADO: Ahora soporta filtros de fecha y sucursal)
export const obtenerTransacciones = async (req, res) => {
  try {
    const { fechaInicio, fechaFin, sucursal } = req.query; // Leemos filtros de la URL
    
    // Construimos la consulta base
    let query = {};

    if (req.user.role === "dueño") {
      // El dueño ve todo lo de su tienda
      query.tienda = req.user.tienda;
      // Filtro opcional por sucursal para el dueño
      if (sucursal) {
        query.sucursal = sucursal;
      }
    } else {
      // El vendedor solo ve sus propias transacciones
      query.user = req.user.id;
    }

    // Filtros de Fecha (si vienen en la URL)
    if (fechaInicio || fechaFin) {
      query.fecha = {};
      if (fechaInicio) query.fecha.$gte = new Date(fechaInicio); // Mayor o igual
      if (fechaFin) {
        const fin = new Date(fechaFin);
        fin.setHours(23, 59, 59, 999); // Asegurar que incluya todo el día final
        query.fecha.$lte = fin; // Menor o igual
      }
    }

    const transacciones = await Transaction.find(query)
      .populate("user", "name email role tienda")
      .populate("sucursal", "nombre") // Agregué esto por si necesitan ver el nombre de la sucursal
      .sort({ fecha: -1 }); // Ordenar: más recientes primero

    res.json(transacciones);
  } catch (error) {
    console.error("❌ Error al obtener transacciones:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// 3. Obtener Estadísticas (NUEVO: Para los reportes gráficos)
export const obtenerEstadisticas = async (req, res) => {
  try {
    const { fechaInicio, fechaFin, sucursal } = req.query;
    let matchStage = {};

    // Seguridad: Filtramos por tienda o usuario igual que arriba
    if (req.user.role === "dueño") {
      // Convertimos a ObjectId porque 'aggregate' es más estricto con los tipos
      matchStage.tienda = new mongoose.Types.ObjectId(req.user.tienda);
      if (sucursal) matchStage.sucursal = new mongoose.Types.ObjectId(sucursal);
    } else {
      matchStage.user = new mongoose.Types.ObjectId(req.user.id);
    }

    // Filtro de fechas
    if (fechaInicio || fechaFin) {
      matchStage.fecha = {};
      if (fechaInicio) matchStage.fecha.$gte = new Date(fechaInicio);
      if (fechaFin) {
        const fin = new Date(fechaFin);
        fin.setHours(23, 59, 59, 999);
        matchStage.fecha.$lte = fin;
      }
    }

    // Agregación de MongoDB (Suma automática)
    const stats = await Transaction.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: null,
          totalIngresos: { $sum: { $cond: [{ $eq: ["$tipo", "ingreso"] }, "$monto", 0] } },
          totalEgresos: { $sum: { $cond: [{ $eq: ["$tipo", "egreso"] }, "$monto", 0] } },
          cantidadTransacciones: { $sum: 1 }
        }
      }
    ]);

    const resultado = stats.length > 0 ? stats[0] : { totalIngresos: 0, totalEgresos: 0, cantidadTransacciones: 0 };
    resultado.balance = resultado.totalIngresos - resultado.totalEgresos;

    res.json(resultado);

  } catch (error) {
    console.error("❌ Error en estadísticas:", error);
    res.status(500).json({ message: "Error al generar reporte" });
  }
};
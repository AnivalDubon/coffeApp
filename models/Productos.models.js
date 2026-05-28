import mongoose from "mongoose";

const productosSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  imagen: String,
  categoria: String
});

// 🔥 FIX AQUÍ
const Productos = mongoose.models.productos || mongoose.model("productos", productosSchema);

export default Productos;
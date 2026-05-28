import mongoose from "mongoose";

const datos = mongoose.Schema({
  imagen: String,
  nombreProducto: String,
  descripcion: String,
  precio: Number,
  categoria: String
});

const Datos = mongoose.model("productos", datos);

export default Datos;
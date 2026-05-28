import Models from "../models/index.js";

const crearProducto = async (req, res) => {
  try {
    const producto = new Models.Productos(req.body);
    const guardar = await producto.save();
    res.status(200).json(guardar);
  } catch (error) {
    res.status(500).json({ msg: "Error al crear producto" });
  }
};

const obtenerProductos = async (req, res) => {
  try {
    const productos = await Models.Productos.find();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener productos" });
  }
};

const eliminarProducto = async (req, res) => {
  try {
    await Models.Productos.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Eliminado" });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar" });
  }
};

export default {
  crearProducto,
  obtenerProductos,
  eliminarProducto
};
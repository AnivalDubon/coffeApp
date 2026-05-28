import Models from "../models/index.js";

export default {

  // ===============================
  // AGREGAR PRODUCTO AL MENÚ
  // ===============================
  postDatos: async (req, res, next) => {
    try {
      const { imagen, nombreProducto, descripcion, precio } = req.body;

      const guardarDatos = new Models.Datos({
        imagen,
        nombreProducto,
        descripcion,
        precio
      });

      const guardar = await guardarDatos.save();
      res.status(200).json(guardar);

    } catch (error) {
      res.status(500).send({
        message: "Error al agregar producto",
      });
      next(error);
    }
  },

  // ===============================
  // OBTENER TODOS LOS PRODUCTOS
  // ===============================
  getDatos: async (req, res, next) => {
    try {
      const obtener = await Models.Datos.find();
      res.status(200).json(obtener);
    } catch (error) {
      res.status(500).send({
        message: "Error al obtener los productos",
      });
      next(error);
    }
  },

  // ===============================
  // OBTENER UN PRODUCTO POR ID
  // ===============================
  getDato: async (req, res, next) => {
    try {
      const obtener = await Models.Datos.findById(req.params.id);
      res.status(200).json(obtener);
    } catch (error) {
      res.status(500).send({
        message: "Error al obtener el producto",
      });
      next(error);
    }
  },

  // ===============================
  // ACTUALIZAR PRODUCTO
  // ===============================
  putDatos: async (req, res, next) => {
    try {
      const { imagen, nombreProducto, descripcion, precio } = req.body;

      const actualizarDatos = {
        imagen,
        nombreProducto,
        descripcion,
        precio
      };

      const actualizar = await Models.Datos.findByIdAndUpdate(
        req.params.id,
        actualizarDatos,
        { new: true }
      );

      res.status(200).json(actualizar);

    } catch (error) {
      res.status(500).send({
        message: "Error al actualizar producto",
      });
      next(error);
    }
  },

  // ===============================
  // ELIMINAR PRODUCTO
  // ===============================
  delDatos: async (req, res, next) => {
    try {
      await Models.Datos.findByIdAndDelete(req.params.id);
      res.status(200).send({
        message: "Producto eliminado correctamente"
      });

    } catch (error) {
      res.status(500).send({
        message: "Error al eliminar producto",
      });
      next(error);
    }
  },

};

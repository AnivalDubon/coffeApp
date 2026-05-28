import routerx from "express-promise-router";
import ProductosController from "../controllers/Productos.controllers.js";

const router = routerx();

router.post("/crear", ProductosController.crearProducto);
router.get("/obtener", ProductosController.obtenerProductos);
router.delete("/eliminar/:id", ProductosController.eliminarProducto);

export default router;
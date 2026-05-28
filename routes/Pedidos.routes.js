import routerx from "express-promise-router";
import PedidosController from "../controllers/Pedidos.controller.js";

const router = routerx();

router.post(
"/agregar",
PedidosController.crearPedido
);

router.get(
"/obtener",
PedidosController.obtenerPedidos
);

router.get(
"/usuario/:numeroControl",
PedidosController.obtenerPedidosUsuario
);

router.put(
"/estado/:id",
PedidosController.cambiarEstado
);

// 🔥 ELIMINAR PEDIDO
router.delete(
"/eliminar/:id",
PedidosController.eliminarPedido
);

export default router;
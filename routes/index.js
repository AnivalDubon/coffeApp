import routerx from "express-promise-router";
import DatosR from "./Datos.routes.js";
import CuentasR from "./Cuentas.routes.js";
import AuthR from "./Usuarios.routes.js";
import PedidosR from "./Pedidos.routes.js";
import ProductosR from "./Productos.routes.js";

const router = routerx();


router.use("/productos", DatosR);
router.use("/admin/productos", ProductosR);
router.use("/cuentas", CuentasR);
router.use("/user", AuthR);
router.use("/pedidos", PedidosR);

export default router;
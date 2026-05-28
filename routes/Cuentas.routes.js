import Datosctr from "../controllers/Cuentas.controller.js";
import routerc from "express-promise-router";

const routers = routerc();

// =========================================
// AUTH
// =========================================

routers.post(
"/auth/registro",
Datosctr.postDatos
);

routers.post(
"/auth/login",
Datosctr.Login
);

routers.post(
"/auth/refreshtoken",
Datosctr.refreshAccessToken
);

// =========================================
// OBTENER
// =========================================

routers.get(
"/obtener-cuenta",
Datosctr.getDatos
);

routers.get(
"/obtener/:id",
Datosctr.getDato
);

// =========================================
// ACTUALIZAR
// =========================================

routers.patch(
"/put/:id",
Datosctr.putDatos
);

// 🔥 FOTO PERFIL
routers.patch(
"/foto/:id",
Datosctr.actualizarFotoPerfil
);

// =========================================
// ELIMINAR
// =========================================

routers.delete(
"/delet/:id",
Datosctr.delDatos
);

export default routers;
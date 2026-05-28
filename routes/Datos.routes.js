import Datosctr from "../controllers/Datos.controller.js";
import routerx from "express-promise-router";

const router = routerx();

router.post("/", Datosctr.postDatos);
router.get("/", Datosctr.getDatos);
router.get("/:id", Datosctr.getDato);
router.patch("/:id", Datosctr.putDatos);
router.delete("/:id", Datosctr.delDatos);

export default router;
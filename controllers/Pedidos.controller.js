import Models from "../models/index.js"; 
import jwt from "../utils/jwt.js";

// =========================================
// CREAR PEDIDO
// =========================================

const crearPedido = async (req, res, next) => {

try {

const token =
req.headers.authorization?.replace(
"Bearer ",
""
);

if (!token) {

return res.status(401).json({
msg:"Token requerido"
});

}

const decoded =
jwt.decoded(token);

const usuario =
await Models.Cuentas.findById(
decoded.usuario_id
);

if (!usuario) {

return res.status(404).json({
msg:"Usuario no encontrado"
});

}

const {
productos,
total
} = req.body;

const nuevoPedido =
new Models.Pedidos({

numeroControl:
usuario.numeroControl,

nombreUsuario:
usuario.nombreCompleto,

productos,
total

});

const guardar =
await nuevoPedido.save();

res.status(200).json(
guardar
);

} catch (error) {

console.log(error);

res.status(500).json({
message:
"Error al crear pedido"
});

}

};

// =========================================
// OBTENER PEDIDOS
// =========================================

const obtenerPedidos = async (
req,
res,
next
) => {

try {

const pedidos =
await Models.Pedidos.find();

res.status(200).json(
pedidos
);

} catch (error) {

res.status(500).json({
message:
"Error al obtener pedidos"
});

}

};

// =========================================
// PEDIDOS USUARIO
// =========================================

const obtenerPedidosUsuario =
async (req, res, next) => {

try {

const pedidos =
await Models.Pedidos.find({

numeroControl:
req.params.numeroControl

});

res.status(200).json(
pedidos
);

} catch (error) {

res.status(500).json({

message:
"Error al obtener pedidos del usuario"

});

}

};

// =========================================
// CAMBIAR ESTADO
// =========================================

const cambiarEstado =
async (req, res) => {

try {

const { estado } =
req.body;

const actualizado =
await Models.Pedidos.findByIdAndUpdate(

req.params.id,

{ estado },

{ new: true }

);

res.status(200).json(
actualizado
);

} catch (error) {

res.status(500).json({

message:
"Error al cambiar estado"

});

}

};

// =========================================
// ELIMINAR PEDIDO
// =========================================

const eliminarPedido =
async (req, res) => {

try {

await Models.Pedidos.findByIdAndDelete(
req.params.id
);

res.status(200).json({
msg:"Pedido eliminado"
});

} catch (error) {

console.log(error);

res.status(500).json({
msg:"Error al eliminar pedido"
});

}

};

// =========================================
// EXPORT
// =========================================

export default {

crearPedido,

obtenerPedidos,

obtenerPedidosUsuario,

cambiarEstado,

eliminarPedido

};
import mongoose from "mongoose";

const pedidosSchema = new mongoose.Schema({

numeroControl:{
type:String,
required:true
},

nombreUsuario:{
type:String,
required:true
},

productos:[
{
nombreProducto:{
type:String,
required:true
},

cantidad:{
type:Number,
required:true
},

precio:{
type:Number,
required:true
}
}
],

total:{
type:Number,
required:true
},

estado:{
type:String,
default:"Pendiente"
},

fecha:{
type:Date,
default:Date.now
}

},
{
timestamps:true
}
);

const Pedidos =
mongoose.model(
"Pedidos",
pedidosSchema
);

export default Pedidos;
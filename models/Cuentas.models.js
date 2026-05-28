import mongoose from "mongoose";

const cuentas = mongoose.Schema({

  nombreCompleto: String,

  semestre: String,

  carrera: String,

  numeroControl: String,

  password: String,
  

  // 🔥 FOTO PERFIL
  fotoPerfil:{
    type:String,
    default:""
  },

  rol: {
    type: String,
    default: "usuario"
  }

});

const Cuentas = mongoose.model("cuentas", cuentas);

export default Cuentas;
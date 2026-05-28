import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../constantes.js";

export default {

  createAccessToken: function (usuario) {
    const expToken = new Date();
    expToken.setHours(expToken.getHours() + 3);

    const payload = {
      token_type: "access",
      usuario_id: usuario._id,
      iat: Date.now(),
      exp: Math.floor(expToken.getTime() / 1000) // 🔥 en segundos
    };

    return jwt.sign(payload, JWT_SECRET_KEY);
  },

  createRefreshToken: function (usuario) {
    const expToken = new Date();
    expToken.setMonth(expToken.getMonth() + 1);

    const payload = {
      token_type: "refresh",
      usuario_id: usuario._id,
      iat: Date.now(),
      exp: Math.floor(expToken.getTime() / 1000)
    };

    return jwt.sign(payload, JWT_SECRET_KEY);
  },

  // 🔥 ESTA ES LA IMPORTANTE
  decoded: function (token) {
    return jwt.verify(token, JWT_SECRET_KEY);
  }

};
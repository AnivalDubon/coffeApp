import Model from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "../utils/jwt.js";

export default {

  // =========================================
  // REGISTRO
  // =========================================

  postDatos: async (req, res, next) => {

    try {

      const {
        nombreCompleto,
        semestre,
        carrera,
        numeroControl,
        password
      } = req.body;

      const salt = bcrypt.genSaltSync(10);

      const hashPassword =
        bcrypt.hashSync(password, salt);

      const guardarDatos =
        new Model.Cuentas({

          nombreCompleto,
          semestre,
          carrera,
          numeroControl,
          password: hashPassword

        });

      const guardar =
        await guardarDatos.save();

      res.status(200).json(guardar);

    } catch (error) {

      res.status(500).send({
        message: "Error al registrar usuario",
      });

      next(error);

    }

  },

  // =========================================
  // LOGIN
  // =========================================

  Login: async (req, res) => {

    const {
      numeroControl,
      password
    } = req.body;

    try {

      if (!numeroControl)
        return res.status(400).send({
          msg: "El número de control es obligatorio"
        });

      if (!password)
        return res.status(400).send({
          msg: "La contraseña es obligatoria"
        });

      const response =
        await Model.Cuentas.findOne({
          numeroControl
        });

      if (!response)
        return res.status(400).send({
          msg: "Usuario no encontrado"
        });

      bcrypt.compare(
        password,
        response.password,

        (bcryptError, check) => {

          if (bcryptError) {

            res.status(500).send({
              msg: "Error del servidor"
            });

          } else if (!check) {

            res.status(400).send({
              msg: "Contraseña incorrecta"
            });

          } else {

            res.status(200).send({

              user: {

                id: response._id,

                nombre: response.nombreCompleto,

                numeroControl:
                  response.numeroControl,

                carrera:
                  response.carrera,

                semestre:
                  response.semestre,

                rol:
                  response.rol || "usuario",

                fotoPerfil:
                  response.fotoPerfil || ""

              },

              access:
                jwt.createAccessToken(response),

              refresh:
                jwt.createRefreshToken(response)

            });

          }

        }

      );

    } catch (error) {

      res.status(500).send({
        msg: "Error al autenticar"
      });

    }

  },

  // =========================================
  // REFRESH TOKEN
  // =========================================

  refreshAccessToken: async (req, res) => {

    const { token } = req.body;

    if (!token)
      return res.status(400).send({
        msg: "Token requerido"
      });

    const { usuario_id } =
      jwt.decoded(token);

    try {

      const response =
        await Model.Cuentas.findOne({
          _id: usuario_id
        });

      res.status(200).send({

        accessToken:
          jwt.createAccessToken(response)

      });

    } catch (error) {

      res.status(500).send({
        msg: "Error del servidor"
      });

    }

  },

  // =========================================
  // OBTENER TODOS
  // =========================================

  getDatos: async (req, res, next) => {

    try {

      const obtener =
        await Model.Cuentas.find();

      res.status(200).json(obtener);

    } catch (error) {

      res.status(500).send({
        message: "Error al obtener los datos",
      });

      next(error);

    }

  },

  // =========================================
  // OBTENER POR ID
  // =========================================

  getDato: async (req, res, next) => {

    try {

      const obtener =
        await Model.Cuentas.findById(
          req.params.id
        );

      res.status(200).json(obtener);

    } catch (error) {

      res.status(500).send({
        message: "Error al obtener el dato",
      });

      next(error);

    }

  },

  // =========================================
  // ACTUALIZAR
  // =========================================

  putDatos: async (req, res, next) => {

    try {

      const {
        nombreCompleto,
        semestre,
        carrera,
        numeroControl,
        password
      } = req.body;

      let actualizarDatos = {

        nombreCompleto,
        semestre,
        carrera,
        numeroControl

      };

      if (password) {

        const salt =
          bcrypt.genSaltSync(10);

        actualizarDatos.password =
          bcrypt.hashSync(password, salt);

      }

      const actualizar =
        await Model.Cuentas.findByIdAndUpdate(

          req.params.id,

          actualizarDatos,

          {
            new: true
          }

        );

      res.status(200).json(actualizar);

    } catch (error) {

      res.status(500).send({
        message: "Error al actualizar",
      });

      next(error);

    }

  },

  // =========================================
  // FOTO PERFIL
  // =========================================

  actualizarFotoPerfil: async (req, res) => {

    try {

      const { fotoPerfil } = req.body;

      const actualizar =
        await Model.Cuentas.findByIdAndUpdate(

          req.params.id,

          {
            fotoPerfil
          },

          {
            new:true
          }

        );

      res.status(200).json(actualizar);

    } catch (error) {

      res.status(500).send({
        message:"Error al actualizar foto"
      });

    }

  },

  // =========================================
  // ELIMINAR
  // =========================================

  delDatos: async (req, res, next) => {

    try {

      await Model.Cuentas.findByIdAndDelete(
        req.params.id
      );

      res.status(200).send({
        message:
          "Datos eliminados correctamente"
      });

    } catch (error) {

      res.status(500).send({
        message: "Error al eliminar dato",
      });

      next(error);

    }

  },

};
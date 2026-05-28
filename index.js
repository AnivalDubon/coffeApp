import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 5000);

// =========================================
// CONEXIÓN MONGO
// =========================================

mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch((error) => console.log(error));

// =========================================
// MIDDLEWARES
// =========================================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// =========================================
// RUTAS
// =========================================

app.use("/api", routes);

// =========================================
// SERVIDOR
// =========================================

app.listen(app.get("port"), "0.0.0.0", () => {

  console.log(
    `Example app listening on port: ${app.get("port")}`
  );

});
import express from "express";
import controllerUsuario from "../controller/controllerUsuario.js";
import uploadHandler from "../helpers/UploadImagem.js";

const rotasUsuario = express.Router();
rotasUsuario.post("/entrar", controllerUsuario.entrar);
rotasUsuario.post("/registrar", controllerUsuario.criarUser);
rotasUsuario.get("/conferirUsuario", controllerUsuario.conferirUsuario);

export default rotasUsuario;

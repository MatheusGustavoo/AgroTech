import express from "express";
import controllerPost from "../controller/controllerPostagem.js";
// import tokenUsuario from "../helpers/TokenUsuario.js";
import uploadHandler from "../helpers/UploadImagem.js";

const rotasPost = express.Router();
rotasPost.get("/", controllerPost.listarPost);
rotasPost.get("/meusPosts", controllerPost.meusPosts);
rotasPost.post("/novoPost", uploadHandler, controllerPost.criarPost);

export default rotasPost;

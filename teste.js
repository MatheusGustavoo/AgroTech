//connect DB
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const dbUrl = process.env.DATABASE_URL;
  await mongoose.connect(dbUrl);
  console.log("Conectado");
}
main().catch(err => console.log(err));

export default mongoose;


//tokenusuario
import jwt from "jsonwebtoken";

export default class tokenUsuario {
  static async criarToken(user, req, res) {
    const token = jwt.sign(
      {
        nome: user.nome,
        id: user._id,
      },
      "minhachave"
    );

    res.status(200).json({
      message: "Autenticação conluída",
      token: token,
      userId: user._id,
    });
  }

  static async verificarToken(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(401).json({
        message: "Token inválido",
      });
    }
    const token = await req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(400).json({
        message: "Usuario não existe",
      });
    }
    const decoded = jwt.verify(token, "minhachave");
    if (!decoded) {
      res.status(400).json({
        message: "acesso negado",
      });
    }
    try {
      return decoded;
    } catch (err) {
      res.status(400).json({ message: "O Token é inválido!" });
    }
  }
}

//controllerPost
// import { verify } from "jsonwebtoken";
import Post from "../models/Post.js";
import tokenUsuario from "../helpers/tokenUsuario.js";
class controllerPost {
  static async criarPost(req, res) {
    const { titulo, descricao, imageUrl } = req.body;
    console.log(imageUrl);

    const user = await tokenUsuario.verificarToken(req);

    if (!(titulo || descricao || image)) {
      res.status(400).json({
        message: "Preencha todos os campos",
      });
      return;
    }

    if (!user) {
      res.status(401).json({
        message: "Token inválido",
      });
      return;
    }
    if (!titulo) res.status(400).json({ message: "Preencha o titulo" });
    if (!descricao) res.status(400).json({ message: "Preencha a descrição" });
    if (!imageUrl) {
      res.status(401).json({
        message: "Erro ao carregar a imagem",
      });
      return;
    }
    const post = new Post({
      ID: user.id,
      nome: user.nome,
      titulo: titulo,
      descricao: descricao,
      imagem: imageUrl,
    });

    try {
      const newPost = await post.save();
      //   console.log(user);
      res.status(201).json(newPost);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
  static async listarPost(req, res) {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Token inválido" });
    }
    const posts = await Post.find();
    const user = await tokenUsuario.verificarToken(req, res);
    console.log(user);
    if (!user)
      return res.status(401).json({ message: "Cadastre-se para entrar" });
    if (!posts)
      return res.status(404).json({ message: "nenhum post encontrado" });
    return res.status(200).json(posts);
  }

  static async meusPosts(req, res) {
    const user = await tokenUsuario.verificarToken(req);
    const posts = await Post.find({ ID: user.id });
    if (!posts)
      return res.status(404).json({ message: "nenhum post encontrado" });
    return res.status(200).json(posts);
  }
}

export default controllerPost;


//env
DATABASE_URL=mongodb://localhost:27017/AgroTech
IMGUR_CLIENT_ID=4e85c5a2a303445


//image
import multer from "multer";
import path from "path";
import fs from "fs";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const imgurClientId = process.env.IMGUR_CLIENT_ID;

if (!imgurClientId) {
  throw new Error("Por favor, configure o IMGUR_CLIENT_ID no arquivo .env");
}

const storage = multer.memoryStorage();

const upload = multer({ storage }).single("image");

const uploadToImgur = async buffer => {
  const response = await axios.post(
    "https://api.imgur.com/3/image",
    {
      image: buffer.toString("base64"),
      type: "base64",
    },
    {
      headers: {
        Authorization: `Client-ID ${imgurClientId}`,
      },
    }
  );
  return response.data.data.link;
};

const uploadHandler = async (req, res, next) => {
  upload(req, res, async err => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    try {
      const link = await uploadToImgur(req.file.buffer);
      console.log(link);
      req.body.imageUrl = link;
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

export default uploadHandler;


//rotas
import express from "express";
import controllerPost from "../controller/controllerPost.js";
import tokenUsuario from "../helpers/tokenUsuario.js";
import uploadHandler from "../helpers/image.js";

const rotasPost = express.Router();
rotasPost.get("/", controllerPost.listarPost);
rotasPost.get("/meusPosts", controllerPost.meusPosts);
rotasPost.post("/novoPost", uploadHandler, controllerPost.criarPost);

export default rotasPost;


//post
import { Schema } from "mongoose";
import mongoose from "../helpers/conectDB.js";

const User = mongoose.model(
  "Post",
  new Schema(
    {
      nome: String,
      ID: String,
      titulo: String,
      descricao: String,
      imagem: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  )
);

export default User;

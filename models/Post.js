import { Schema } from "mongoose";
import mongoose from "../db/conectarBD.js";

const Post = mongoose.model(
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

export default Post;

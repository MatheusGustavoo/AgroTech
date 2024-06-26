import { Schema } from "mongoose";
import mongoose from "../db/conectarBD.js";

const User = mongoose.model(
  "users",
  new Schema(
    {
      nome: String,
      email: String,
      senha: String,
      profissao: String,
      telefone: Number,
    },
    { timestamps: true }
  )
);

export default User;

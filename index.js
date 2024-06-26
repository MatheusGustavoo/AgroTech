import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rotasPost from "./routes/RotasPost.js";
import rotasUsuario from "./routes/RotasUsuario.js";
const port = 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/post", rotasPost);
app.use("/usuario", rotasUsuario);

app.listen(port);

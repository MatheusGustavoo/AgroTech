import Post from "../models/Post.js";
import tokenUsuario from "../helpers/tokenUsuario.js";
class controllerPost {
  static async criarPost(req, res) {
    const { titulo, descricao, imageUrl } = req.body;
    

    const user = await tokenUsuario.verificarToken(req);

    if (!(titulo || descricao || imageUrl)) {
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
      // const newPost = await post.save();
      // res.status(201).json(newPost);
      console.log("Foi");
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

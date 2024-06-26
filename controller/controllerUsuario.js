import User from "../models/User.js";
import tokenUsuario from "../helpers/tokenUsuario.js";
class controllerUsuario {
  static async criarUser(req, res) {
    const { nome, email, senha, profissao, telefone } = req.body;

    if (!(nome || email || senha || profissao || telefone)) {
      res.status(400).json({
        message: "Preencha todos os campos",
      });
      return;
    }

    const verificarUser = await User.findOne({ email: email });
    if (verificarUser) {
      res.status(400).json({
        message: "Email ja existe",
      });
      return;
    }

    const user = new User({
      nome: nome,
      email: email,
      senha: senha,
      profissao: profissao,
      telefone: telefone,
    });

    try {
      const novoUsuario = await user.save();
      await tokenUsuario.criarToken(novoUsuario, req, res);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
  static async entrar(req, res) {
    const { email, senha } = req.body;
    if (!(email || senha)) {
      res.status(400).json({
        message: "Preencha todos os campos",
      });
      return;
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(400).json({
        message: "Email ou senha inválido",
      });
      return;
    }

    if (user.senha !== senha) {
      res.status(400).json({
        message: "Email ou senha inválido",
      });
      return;
    }
    try {
      await tokenUsuario.criarToken(user, req, res);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
  static async conferirUsuario(req, res) {
    const user = await tokenUsuario.verificarToken(req);
    if (!user) {
      return res.status(401).json({ message: "Token inválido" });
    }
    return res.status(200).json(user);
  }
}

export default controllerUsuario;

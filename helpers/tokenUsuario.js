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
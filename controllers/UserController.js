const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const createToken = require("../helpers/createToken");
const getUserByToken = require("../helpers/getUserByToken");
const getToken = require("../helpers/getToken");

module.exports = class UserController {
  static async register(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;

    // validação
    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório!" });
      return;
    }

    if (!email) {
      res.status(422).json({ message: "O e-mail é obrigatório!" });
      return;
    }

    if (!phone) {
      res.status(422).json({ message: "O telefone é obrigatório!" });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória!" });
      return;
    }

    if (!confirmpassword) {
      res
        .status(422)
        .json({ message: "A confirmação de senha é obrigatória!" });
      return;
    }

    if (password != confirmpassword) {
      res
        .status(422)
        .json({ message: "A senha e a confirmação precisam ser iguais!" });
      return;
    }

    // check
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      res.status(422).json({ message: "Por favor, utilize outro e-mail!" });
      return;
    }

    // senha
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // usuario
    const user = new User({
      name: name,
      email: email,
      phone: phone,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();
      await createToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async login(req, res) {
    const { email, password } = req.body;

    if (!email) {
      res.status(422).json({ message: "O email é obrigatório!" });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "A senha é obrigatório!" });
      return;
    }
    const users = await User.findOne({ email: email });

    if (!users) {
      res.status(422).json({ message: "Não há usuario com esse email" });
      return;
    }
    //check password
    const checkPassword = await bcrypt.compare(password, users.password);

    if (!checkPassword) {
      res.status(422).json({ message: "Senha inválida" });
      return;
    }
    //login
    await createToken(users, req, res);
  }
  static async checkUser(req, res) {
    let currentUser;

    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, "agrotechtoken");
      currentUser = await User.findById(decoded.id);

      currentUser.password = undefined;
    } else {
      currentUser = null;
    }
    res.status(200).send(currentUser);
  }
  static async getUserID(req, res) {
    const id = req.params.id;
    try {
      const user = await User.findById(id).select("-password");
      res.status(200).json({ user });
    } catch (error) {
      return res.status(422).json({ message: "Usuário não encontrado!" });
    }
  }
  static async editUser(req, res) {
    const token = getToken(req);
    //console.log(token);

    const user = await getUserByToken(token);

    // console.log(user);
    // console.log(req.body)
    // console.log(req.file.filename)

    const { name, email, password, confirmpassword, phone } = req.body;

    let image = "";

    if (req.file) {
      user.image = req.file.filename;
    }

    // validations
    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório!" });
      return;
    }

    user.name = name;

    if (!email) {
      res.status(422).json({ message: "O e-mail é obrigatório!" });
      return;
    }

    // check if user exists
    const userExists = await User.findOne({ email: email });

    if (user.email !== email && userExists) {
      res.status(422).json({ message: "Por favor, utilize outro e-mail!" });
      return;
    }

    user.email = email;

    if (image) {
      const imageName = req.file.filename;
      user.image = imageName;
    }

    if (!phone) {
      res.status(422).json({ message: "O telefone é obrigatório!" });
      return;
    }

    user.phone = phone;

    // check if password match
    if (password != confirmpassword) {
      res.status(422).json({ error: "As senhas não conferem." });

      // change password
    } else if (password == confirmpassword && password != null) {
      // creating password
      const salt = await bcrypt.genSalt(12);
      const reqPassword = req.body.password;

      const passwordHash = await bcrypt.hash(reqPassword, salt);

      user.password = passwordHash;
    }

    try {
      // returns updated data
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true }
      );
      res.json({
        message: "Usuário atualizado com sucesso!",
        data: updatedUser,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
};

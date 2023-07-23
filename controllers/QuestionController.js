const getToken = require("../helpers/getToken");
const getUserByToken = require("../helpers/getUserByToken");
const Question = require("../models/Questions");
const Comments = require("../models/Comments");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class QuestionController {
  //pub create
  static async create(req, res) {
    const { title, description, comments, status } = req.body;
    // const imagem = await req.files
    let images = "";

    if (!title) {
      res.status(422).json({ message: "O titulo é obrigatório" });
      return;
    }
    if (!description) {
      res.status(422).json({ message: " A descrição é obrigatório" });
      return;
    }
    //get user
    const token = getToken(req);
    const user = await getUserByToken(token);
    console.log(user);
    //creat post
    const question = new Question({
      title,
      description,
      images,
      user: {
        _id: user.id,
        name: user.name,
        image: user.image,
      },
    });

    if (req.file) {
      question.images = req.file.filename;
    }
    try {
      const newQuestion = await question.save();
      res.status(201).json({
        message: "Post concluído",
        newQuestion,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async getAll(req, res) {
    const question = await Question.find().sort("-creatdAt");
    res.status(200).json({
      question: question,
    });
  }

  static async getMyPosts(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);
    const question = await Question.find({ "user._id": user.id }).sort(
      "-createdAt"
    );
    res.status(200).json({
      question,
    });
  }
  static async getPostById(req, res) {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.status(422).json({
        message: "ID não encontrado",
      });
      return;
    }
    //get post by id
    const question = await Question.find({ _id: id });
    if (!question) {
      res.status(404).json({
        message: "Post não encontrado",
      });
    }

    res.status(200).json({
      question: question,
    });
  }

  static async getComments(req, res) {
    const id = req.params.id;

    //validation
    if (!ObjectId.isValid(id)) {
      res.status(422).json({
        message: "ID não encontrado",
      });
      return;
    }
    //get post by id
    const question = await Question.find({ _id: id });
    if (!question) {
      res.status(404).json({
        message: "Post não encontrado",
      });
    }

    //sapce
    const comments = await Comments.find().sort("-creatdAt");
    res.status(200).json({
      comments: comments,
    });
  }

  static async createComments(req, res) {
    const id = req.params.id;
    const { content } = req.body;
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (!ObjectId.isValid(id)) {
      res.status(422).json({
        message: "ID não encontrado",
      });
      return;
    }
    //get post by id
    const questions = await Question.find({ _id: id });
    if (!questions) {
      res.status(404).json({
        message: "Post não encontrado",
      });
      return;
    }

    //new comments
    const comment = new Comments({
      user: {
        _id: user.id,
        name: user.name,
        image: user.image,
      },
      question: {
        _id: id,
      },
      content,
    });

    try {
      const newComment = await comment.save();
      res.status(201).json({
        message: "Comentario feito com sucesso",
        newComment,
      });
    } catch (error) {}
  }
  static async removePost(req, res) {
    const id = req.params.id;
    const questions = await Question.find({ _id: id });

    //checkId
    if (!ObjectId.isValid(id)) {
      res.status(422).json({
        message: "ID não encontrado",
      });
      return;
    }
    if (!questions.length || !questions) {
      res.status(404).json({
        message: "Post não encontrado",
      });
      return;
    }

    //check user
    const token = getToken(req);
    const user = await getUserByToken(token);
    console.log(questions[0], user._id.toString());

    if (questions[0].user._id.toString() != user._id.toString()) {
      res.status(404).json({
        message:
          "Houve um problema em processar sua solicitação, tente novamente mais tarde!",
      });
      return;
    }
    console.log(id);
    await Question.findByIdAndRemove(id);
    res.status(200).json({ message: "Pergunta removida" });
  }
};

const router = require("express").Router();
const QuestionController = require("../controllers/QuestionController");

//middlewears
const verifyToken = require("../helpers/verifyToken");
const { imageUpload } = require("../helpers/upImage");

router.post(
  "/create",
  verifyToken,
  imageUpload.single("images"),
  QuestionController.create
);
router.get("/", QuestionController.getAll);
router.get("/myposts", verifyToken, QuestionController.getMyPosts);
router.get("/:id", QuestionController.getPostById);
router.get("/:id/comments", verifyToken, QuestionController.getComments);
router.post("/:id/comments", verifyToken, QuestionController.createComments);

// router.post("/:id/comments", verifyToken, QuestionController.create)
module.exports = router;

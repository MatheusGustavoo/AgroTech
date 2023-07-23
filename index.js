const express = require("express");
const cors = require("cors");
const app = express();
const UserRoutes = require("./routes/UserRoutes");
const QuestionRoutes = require("./routes/QuestionsRoutes");
// const CommentsRoutes = require("./routes/CommentsRoutes")

//iniciar express
app.use(express.json());

// //config CORS
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(express.static("public"));

app.use("/users", UserRoutes);
app.use("/question", QuestionRoutes);
// app.use("/comments", CommentsRoutes)
app.listen(5000);

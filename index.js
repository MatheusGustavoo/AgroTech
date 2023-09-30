const express = require("express");
const cors = require("cors");
const UserRoutes = require("./routes/UserRoutes");
const QuestionRoutes = require("./routes/QuestionsRoutes");
const messageRoutes = require("./routes/MessagesRoutes");
const app = express();
const socket = require("socket.io");
require("dotenv").config();
//socket.io
// const http = require("http").createServer(app);
// const io

//iniciar express

app.use(express.json());

// //config CORS
app.use(cors());

app.use(express.static("public"));

app.use("/users", UserRoutes);
app.use("/question", QuestionRoutes);
app.use("/messages", messageRoutes);


const server = app.listen(5000);

//config Socket
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});
global.onlineUsers = new Map();
io.on("connection", socket => {
  global.chatSocket = socket;
  socket.on("add-user", userId => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", data => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});

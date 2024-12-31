require("dotenv").config();
const cors = require("cors");
const express = require("express");
const route = require("./routes");
const app = express();
const PORT = process.env.PORT || 4000;
const http = require("http");
const { Server } = require("socket.io");
const commentService = require("../src/services/comment");
const notificationService = require("../src/services/notification");

app.use(cors());

// Init middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Init db
require("./databases/connect-mongodb");

// Use routes
route(app);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:: " + socket.id);

  socket.on("join_room", (mangaID) => {
    socket.join(mangaID);
    console.log(`User with ID: ${socket.id} joined room: ${mangaID}`);
  });

  socket.on("send_comment", async (data) => {
    const { manga_id, user_id, content, parent_comment_id } = data;
    console.log("Data sent to", data);
    if (manga_id && user_id && content) {
      const newComment = await commentService.createComment({
        manga_id,
        user_id,
        content,
        parent_comment_id,
      });
      const foundComment = await commentService.getCommentByID({
        comment_id: parent_comment_id,
      });
      const newNotification = await notificationService.create({
        notification_manga_id: manga_id,
        notification_sender_id: user_id,
        notification_receiver_id: foundComment?.comment_user?.user_id,
        notification_content: content,
      });
      if (parent_comment_id) {
        io.in(manga_id).emit("reply_comment", {});
        io.in(foundComment.comment_user.user_id).emit(
          "receive_notification",
          newNotification
        );
      } else {
        io.in(manga_id).emit("receive_comment", newComment);
      }
    }
    const foundComments = await commentService.getAllCommentOfManga(manga_id);
    io.in(manga_id).emit("change_comment", foundComments.length);
    console.log("Room:: ", manga_id);
  });

  socket.on("get_comment", async (manga_id) => {
    const foundComments = await commentService.getAllCommentOfManga(manga_id);
    io.in(manga_id).emit("change_comment", foundComments.length);
  });

  socket.on("update_notification", async (data) => {
    const { user_id } = data;
    io.in(user_id).emit("receive_notification", {
      message: `notification has changed`,
    });
  });

  socket.on("delete_comment", async (data) => {
    const { manga_id } = data;
    io.in(manga_id).emit("change_comment", {
      message: `comment has changed, delete ${data}`,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
});

const runningServer = server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
  runningServer.close(() => console.log("Exit server express"));
});

module.exports = app;

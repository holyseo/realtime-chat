const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`ID of an user connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join();
    console.log(`User with id: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (message) => {
    console.log(message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});

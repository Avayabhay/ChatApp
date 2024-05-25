import { Server } from "socket.io";
import http from "http";
import express from "express";
import { GiConsoleController } from "react-icons/gi";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});
console.log("inside Socket");
// console.log(io);
// io.on("connection", (s) => console.log(s));
io.on("connection", (socket) => {
  console.log("User Connected : ", socket.id);

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

export { app, io, server };

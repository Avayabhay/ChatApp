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

//Map to store UserID -> SocketI
const userSocketMap = {};

//Function to get the socketID from receiverID
export const getReceiverSocketId = (receiverID) => {
  return userSocketMap[receiverID];
};

// console.log(io);
// io.on("connection", (s) => console.log(s));
io.on("connection", (socket) => {
  console.log("User Connected : ", socket.id);

  //Receiving the UserID
  const userId = socket.handshake.query.userId;

  if (userId != "undefined") {
    userSocketMap[userId] = socket.id;
  }

  //After a new user a connected to the IO, we need to notify all the other
  // connection. To do so, we use emit
  io.emit("getOnlineUsers", Object.keys(userSocketMap)); // We are sending the user Maps

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // We are sending the user Maps
  });
});

export { app, io, server };

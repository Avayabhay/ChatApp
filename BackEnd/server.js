// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import { app, server } from "./socket/socket.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

//TO Parse the incoming requests with JSON Payload(from req.body)
app.use(express.json());
app.use(cookieParser());

//root route
// app.get("/", (req, res) => res.send("Welcome!!"));

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/user", userRoutes);

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is runnig at ${PORT}`);
});

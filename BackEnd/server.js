// const express = require("express");
import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

//TO Parse the incoming requests with JSON Payload(from req.body)
app.use(express.json());

//root route
// app.get("/", (req, res) => res.send("Welcome!!"));

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is runnig at ${PORT}`);
});

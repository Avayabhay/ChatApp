// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";

const app = express();

const PORT = process.env.PORT || 5000;

//root route
app.get("/", (req, res) => res.send("Welcome!!"));

app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`Server is runnig at ${PORT}`));

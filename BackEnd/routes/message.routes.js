import express from "express";
import { sendMessage } from "../controllers/message.controller.js";
import protectedRoute from "../middleware/protectedRoute.js";

const messageRouter = express.Router();

messageRouter.post("/send/:id", protectedRoute, sendMessage);

export default messageRouter;

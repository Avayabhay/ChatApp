import express from "express";
import { sendMessage, getMessage } from "../controllers/message.controller.js";
import protectedRoute from "../middleware/protectedRoute.js";

const messageRouter = express.Router();

messageRouter.get("/:id", protectedRoute, getMessage);
messageRouter.post("/send/:id", protectedRoute, sendMessage);

export default messageRouter;

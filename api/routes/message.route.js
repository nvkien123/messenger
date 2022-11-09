import express from "express";
import messageController from "../controller/message.controller.js";
import JWTAction from "../midleware/JWTAction.js";

const router = express.Router()

router.post("/",JWTAction.verifyToken, messageController.createMessage)

router.get("/:conversationId", messageController.getMessageByConversation)

export default router;
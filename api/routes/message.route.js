import express from "express";
import messageController from "../controller/message.controller.js";

const router = express.Router()

router.post("/", messageController.createMessage)

router.get("/:conversationId", messageController.getMessageByConversation)

export default router;
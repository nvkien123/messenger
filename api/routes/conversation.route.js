import express from "express";
import ConversationController from "../controller/conversation.controller.js";
import route from "./index.js";

const router = express.Router()

router.post("/",ConversationController.createConversation)

router.get("/:userId", ConversationController.getConversationById)

router.get("", ConversationController.getConversation)

router.put("/delete", ConversationController.deleteConversation)

export default router;
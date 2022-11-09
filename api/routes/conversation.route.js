import express from "express";
import ConversationController from "../controller/conversation.controller.js";
import JWTAction from "../midleware/JWTAction.js";

const router = express.Router()

router.post("/",JWTAction.verifyToken,ConversationController.createConversation)

router.get("/:userId", ConversationController.getConversationById)

router.get("", ConversationController.getConversation)

router.put("/delete",JWTAction.verifyToken, ConversationController.deleteConversation)

export default router;
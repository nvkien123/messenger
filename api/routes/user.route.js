import express from "express";
import userController from "../controller/user.controller.js";
import JWTAction from "../midleware/JWTAction.js";

const router = express.Router()

router.put("/:id",JWTAction.verifyToken, userController.updateUser);

router.delete("/:id",JWTAction.verifyToken, userController.deleteUser);

router.get("/", userController.getUser);

export default router;

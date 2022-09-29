import express from "express";
import userController from "../controller/user.controller.js";

const router = express.Router()

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

router.get("/", userController.getUser);

export default router;

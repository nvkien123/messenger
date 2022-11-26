import express from "express";
import AuthController from "../controller/auth.controller.js"

const router = express.Router()

router.post("/register", AuthController.registerUser);

router.post("/login", AuthController.login);

router.post("/verify-token", AuthController.verifyUser);

export default router;

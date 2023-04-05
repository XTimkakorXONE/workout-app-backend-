import express from "express";
import * as AuthController from "./auth.controller.js";

const router = express.Router();

router.route("/login").post(AuthController.login);
router.route("/register").post(AuthController.register);

export default router;

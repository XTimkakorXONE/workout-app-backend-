import express from "express";
import * as UserController from "./user.controller.js";
import { checkAuth } from "../middleware/checkAuth.middleware.js";

const router = express.Router();

router.route("/profile").get(checkAuth, UserController.getUserProfile);

export default router;

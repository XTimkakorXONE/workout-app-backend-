import express from "express";
import { checkAuth } from "../middleware/checkAuth.middleware.js";
import * as ExerciseController from "./exercise.controller.js";

const router = express.Router();

router
  .route("/")
  .post(checkAuth, ExerciseController.createNewExercise)
  .get(checkAuth, ExerciseController.getExercises);

router
  .route("/:id")
  .put(checkAuth, ExerciseController.updateExercise)
  .delete(checkAuth, ExerciseController.deleteExercise);

export default router;

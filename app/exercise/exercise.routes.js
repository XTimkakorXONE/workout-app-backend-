import express from "express";
import { checkAuth } from "../middleware/checkAuth.middleware.js";
import * as ExerciseController from "./exercise.controller.js";
import * as ExerciseLogController from "./log/exercise-log.controller.js";
import { getExerciseLog } from "./log/get-exercise-log.controller.js";
import * as UpdateExerciseLog from "./log/update-exercise-log.controller.js";

const router = express.Router();

router
  .route("/")
  .post(checkAuth, ExerciseController.createNewExercise)
  .get(checkAuth, ExerciseController.getExercises);

router
  .route("/:id")
  .put(checkAuth, ExerciseController.updateExercise)
  .delete(checkAuth, ExerciseController.deleteExercise);

router
  .route("/log/:id")
  .post(checkAuth, ExerciseLogController.createNewExerciseLog)
  .get(checkAuth, getExerciseLog);

router
  .route("/log/time/:id")
  .put(checkAuth, UpdateExerciseLog.updateExerciseLogTime);
router
  .route("/log/complete/:id")
  .patch(checkAuth, UpdateExerciseLog.completeExerciseLog);

export default router;

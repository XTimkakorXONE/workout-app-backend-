import express from "express";
import * as WorkoutController from "./workout.controller.js";
import { checkAuth } from "../middleware/checkAuth.middleware.js";
import { createNewWorkoutLog } from "./log/workout-log.controller.js";
import { updateExerciseLogTime } from "../exercise/log/update-exercise-log.controller.js";
import { getWorkoutLog } from "./log/get-workout-log.controller.js";

const router = express.Router();

router
  .route("/")
  .get(checkAuth, WorkoutController.getWorkouts)
  .post(checkAuth, WorkoutController.createNewWorkout);

router
  .route("/:id")
  .get(checkAuth, WorkoutController.getWorkout)
  .put(checkAuth, WorkoutController.updateWorkout)
  .delete(checkAuth, WorkoutController.deleteWorkout);

router
  .route("/log/:id")
  .post(checkAuth, createNewWorkoutLog)
  .get(checkAuth, getWorkoutLog);

router.route("/log/complete/:id").patch(checkAuth, updateExerciseLogTime);

export default router;

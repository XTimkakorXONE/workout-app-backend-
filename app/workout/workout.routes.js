import express from "express";
import * as WorkoutController from "./workout.controller.js";
import { checkAuth } from "../middleware/checkAuth.middleware.js";

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

export default router;

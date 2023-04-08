import asyncHandler from "express-async-handler";
import { prisma } from "../../prisma.js";

export const getWorkoutLog = asyncHandler(async (req, res) => {
  const workoutLog = await prisma.workoutLog.findUnique({
    where: {
      id: +req.params.id,
    },
    include: {
      workout: {
        include: {
          exercises: true,
        },
      },
      exerciseLogs: {
        orderBy: {
          createAt: "asc",
        },
        include: {
          exercise: true,
        },
      },
    },
  });

  if (!workoutLog) {
    res.status(404);
    throw new Error("log not found");
  }

  res.json({
    ...workoutLog,
    minute: Math.ceil(workoutLog.workout.exercises.length),
  });
});

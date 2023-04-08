import asyncHandler from "express-async-handler";
import { prisma } from "../prisma.js";
import { UserFields } from "../utils/user.utils.js";

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    select: UserFields,
  });

  const countExerciseTimesCompleted = await prisma.exerciseLog.count({
    where: {
      userId: req.user.id,
      isCompleted: true,
    },
  });
  const countWorkoutCompleted = await prisma.workoutLog.count({
    where: {
      userId: user.id,
      isCompleted: true,
    },
  });

  const kgs = await prisma.exerciseTime.aggregate({
    where: {
      ExerciseLog: {
        userId: req.user.id,
      },
      isCompleted: true,
    },

    _sum: {
      weight: true,
    },
  });

  res.json({
    ...user,
    statistics: [
      {
        label: "Minutes",
        value: Math.ceil(countExerciseTimesCompleted * 2.3) || 0,
      },
      {
        label: "Workouts",
        value: countWorkoutCompleted || 0,
      },
      {
        label: "Kgs",
        value: kgs._sum.weight || 0,
      },
    ],
  });
});

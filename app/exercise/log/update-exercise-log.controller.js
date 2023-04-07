import asyncHandler from "express-async-handler";

import prisma from "../../prisma.js";

export const updateExerciseLogTime = asyncHandler(async (req, res) => {
  const { weight, repeat, isCompleted } = req.body;

  try {
    const exerciseLogTime = await prisma.exerciseTime.update({
      where: {
        id: +req.params.id,
      },
      data: {
        weight,
        repeat,
        isCompleted,
      },
    });

    res.json(exerciseLogTime);
  } catch (err) {
    res.status(404);
    throw new Error("Exercise log not found");
  }
});

export const completeExerciseLog = asyncHandler(async (req, res) => {
  const { isCompleted } = req.body;
  try {
    const completeExerciseLog = await prisma.exerciseLog.update({
      where: {
        id: +req.params.id,
      },
      data: {
        isCompleted,
      },
      include: {
        exercise: true,
        workoutLog: true,
      },
    });
    res.json(completeExerciseLog);
  } catch (err) {
    res.status(404);
    throw new Error("Exercise log not found");
  }
});

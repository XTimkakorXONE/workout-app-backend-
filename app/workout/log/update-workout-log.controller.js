import asyncHandler from "express-async-handler";

import { prisma } from "../../prisma.js";

export const updateCompleteWorkoutLog = asyncHandler(async (req, res) => {
  try {
    const workoutLog = await prisma.workoutLog.update({
      where: {
        id: +req.params.id,
      },
      data: {
        isCompleted: true,
      },
    });

    res.json(workoutLog);
  } catch (err) {
    res.status(404);
    throw new Error("workout log not found");
  }
});

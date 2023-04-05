import asyncHandler from "express-async-handler";
import { prisma } from "../prisma.js";

export const createNewExercise = asyncHandler(async (req, res) => {
  const { name, times, iconPath } = req.body;

  const exercise = await prisma.exercise.create({
    data: {
      name,
      times,
      iconPath,
    },
  });
  res.json(exercise);
});

export const getExercises = asyncHandler(async (req, res) => {
  const exercises = await prisma.exercise.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.json(exercises);
});

export const updateExercise = asyncHandler(async (req, res) => {
  const { name, times, iconPath } = req.body;

  try {
    const exercise = await prisma.exercise.update({
      where: {
        id: +req.params.id,
      },
      data: {
        name,
        times,
        iconPath,
      },
    });
    res.json(exercise);
  } catch (err) {
    res.status(404);
    throw new Error("Not found");
  }
});

export const deleteExercise = asyncHandler(async (req, res) => {
  try {
    await prisma.exercise.delete({
      where: {
        id: +req.params.id,
      },
    });
    res.json({ message: "Exercise deleted" });
  } catch (err) {
    res.status(404);
    throw new Error("Not found");
  }
});

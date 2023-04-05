import asyncHandler from "express-async-handler";
import { prisma } from "../prisma.js";

export const getWorkouts = asyncHandler(async (req, res) => {
  const workouts = await prisma.workout.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      exercises: true,
    },
  });
  res.json(workouts);
});

export const getWorkout = asyncHandler(async (req, res) => {
  const workout = await prisma.workout.findUnique({
    where: {
      id: +req.params.id,
    },
    include: {
      exercises: true,
    },
  });

  if (!workout) {
    res.status(404);
    throw new Error("Workout not found!");
  }

  const minutes = Math.ceil(workout.exercises.length * 3.6);

  res.json({ ...workout, minutes });
});

export const createNewWorkout = asyncHandler(async (req, res) => {
  const workout = await prisma.workout.create({
    data: {
      name: req.body.name,
      exercises: {
        connect: req.body.exercises.map((id) => ({ id: +id })),
      },
    },
  });

  res.json(workout);
});

export const updateWorkout = asyncHandler(async (req, res) => {
  const { name, exerciseIds } = req.body;

  try {
    const workout = await prisma.workout.update({
      where: {
        id: +req.params.id,
      },
      data: {
        name: req.body.name,
        exercises: {
          set: req.body.exercises.map((id) => ({ id: +id })),
        },
      },
    });
    res.json(workout);
  } catch (err) {
    console.warn(err);
  }
});

export const deleteWorkout = asyncHandler(async (req, res) => {
  try {
    await prisma.workout.delete({
      where: {
        id: +req.params.id,
      },
    });
    res.json({ message: "Workout deleted" });
  } catch (err) {
    res.status(404);
    throw new Error("Not found");
  }
});

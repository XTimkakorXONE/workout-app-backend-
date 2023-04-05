import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import { prisma } from "./app/prisma.js";
import authRoutes from "./app/auth/auth.routes.js";
import userRoutes from "./app/user/user.routes.js";
import exercisesRoutes from "./app/exercise/exercise.routes.js";
import workoutRoutes from "./app/workout/workout.routes.js";
import { errorHandler, notFound } from "./app/middleware/error.middleware.js";

const app = express();

dotenv.config();

async function main() {
  if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

  app.use(express.json());
  app.use(cors());

  const __dirname = path.resolve();

  app.use("/uploads", express.static(path.join(__dirname, "/uploads/")));

  app.use("/api/auth", authRoutes);
  app.use("/api/user", userRoutes);
  app.use("/api/exercises", exercisesRoutes);
  app.use("/api/workouts", workoutRoutes);

  app.use(notFound);
  app.use(errorHandler);

  const PORT = process.env.PORT || 4444;

  app.listen(PORT, console.log(`Server running in PORT: ${PORT}`));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit();
  });

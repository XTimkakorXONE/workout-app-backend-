-- CreateTable
CREATE TABLE "Exercise_log" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER,
    "workout_log_id" INTEGER,

    CONSTRAINT "Exercise_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise_time" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "weight" INTEGER NOT NULL,
    "repeat" INTEGER NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "exercise_log_id" INTEGER NOT NULL,

    CONSTRAINT "Exercise_time_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workout_log" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER,
    "workout_id" INTEGER,

    CONSTRAINT "Workout_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExerciseToExerciseLog" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToExerciseLog_AB_unique" ON "_ExerciseToExerciseLog"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToExerciseLog_B_index" ON "_ExerciseToExerciseLog"("B");

-- AddForeignKey
ALTER TABLE "Exercise_log" ADD CONSTRAINT "Exercise_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise_log" ADD CONSTRAINT "Exercise_log_workout_log_id_fkey" FOREIGN KEY ("workout_log_id") REFERENCES "Workout_log"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise_time" ADD CONSTRAINT "Exercise_time_exercise_log_id_fkey" FOREIGN KEY ("exercise_log_id") REFERENCES "Exercise_log"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout_log" ADD CONSTRAINT "Workout_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout_log" ADD CONSTRAINT "Workout_log_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "Workout"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToExerciseLog" ADD CONSTRAINT "_ExerciseToExerciseLog_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToExerciseLog" ADD CONSTRAINT "_ExerciseToExerciseLog_B_fkey" FOREIGN KEY ("B") REFERENCES "Exercise_log"("id") ON DELETE CASCADE ON UPDATE CASCADE;

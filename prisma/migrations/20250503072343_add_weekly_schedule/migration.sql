/*
  Warnings:

  - You are about to drop the column `date` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `shift` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Staff` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "date",
DROP COLUMN "shift",
DROP COLUMN "time";

-- CreateTable
CREATE TABLE "WeeklySchedule" (
    "id" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,

    CONSTRAINT "WeeklySchedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WeeklySchedule" ADD CONSTRAINT "WeeklySchedule_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

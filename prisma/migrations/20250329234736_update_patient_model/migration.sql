/*
  Warnings:

  - You are about to drop the column `roomNumber` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `wardDepartment` on the `Patient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "roomNumber",
DROP COLUMN "wardDepartment",
ADD COLUMN     "Department" TEXT,
ADD COLUMN     "assignedRoom" TEXT;

/*
  Warnings:

  - You are about to drop the column `Department` on the `Patient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "Department",
ADD COLUMN     "department" TEXT;

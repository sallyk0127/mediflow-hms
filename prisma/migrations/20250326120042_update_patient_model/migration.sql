/*
  Warnings:

  - The `roomNumber` column on the `Patient` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `bedNumber` column on the `Patient` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "roomNumber",
ADD COLUMN     "roomNumber" INTEGER,
DROP COLUMN "bedNumber",
ADD COLUMN     "bedNumber" INTEGER;

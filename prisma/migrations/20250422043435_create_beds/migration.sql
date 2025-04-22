-- CreateEnum
CREATE TYPE "BedStatus" AS ENUM ('AVAILABLE', 'OCCUPIED');

-- CreateTable
CREATE TABLE "Bed" (
    "id" TEXT NOT NULL,
    "bedId" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "patientName" TEXT,
    "location" TEXT NOT NULL,
    "status" "BedStatus" NOT NULL DEFAULT 'AVAILABLE',
    "usedUntil" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bed_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bed_bedId_key" ON "Bed"("bedId");

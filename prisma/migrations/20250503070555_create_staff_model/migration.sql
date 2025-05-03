-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "shift" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Staff_staffId_key" ON "Staff"("staffId");

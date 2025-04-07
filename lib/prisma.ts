import { PrismaClient } from "@prisma/client"

// Add debug logging
const prismaClientSingleton = () => {
  console.log("Initializing PrismaClient")
  return new PrismaClient({
    log: ["query", "error", "warn"],
  })
}

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || prismaClientSingleton()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma


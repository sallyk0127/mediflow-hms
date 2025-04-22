import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const departments = [
  { name: "Med-Surgical", prefix: "MS", totalBeds: 70 },
  { name: "ICU", prefix: "ICU", totalBeds: 20 },
  { name: "Maternity Care", prefix: "MC", totalBeds: 30 },
  { name: "Behaviour and Mental", prefix: "BM", totalBeds: 50 },
  { name: "Senior Living", prefix: "SL", totalBeds: 50 },
]

async function main() {
  for (const department of departments) {
    for (let i = 1; i <= department.totalBeds; i++) {
      await prisma.bed.create({
        data: {
          bedId: `${department.prefix}-${String(i).padStart(3, "0")}`,
          division: department.name,
          location: `Floor ${Math.ceil(i / 4)}, Room ${200 + i}`,
          status: "AVAILABLE",
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

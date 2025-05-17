// seed to create beds in various departments

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const departments = [
  { name: "Med-Surgical", prefix: "MS", totalBeds: 70, floor: 2, bedsPerRoom: 4 },
  { name: "ICU", prefix: "ICU", totalBeds: 20, floor: 1, bedsPerRoom: 2 },
  { name: "Maternity Care", prefix: "MC", totalBeds: 30, floor: 3, bedsPerRoom: 3 },
  { name: "Behaviour and Mental", prefix: "BM", totalBeds: 50, floor: 4, bedsPerRoom: 2 },
  { name: "Senior Living", prefix: "SL", totalBeds: 50, floor: 5, bedsPerRoom: 2 },
];

async function main() {
  for (const dept of departments) {
    let roomCount = 0;
    let bedsInRoom = 0;

    for (let i = 1; i <= dept.totalBeds; i++) {
      // Calculate room number like: 400, 401, 402
      const roomNumber = dept.floor * 100 + roomCount;
      const location = `Floor ${dept.floor}, Room ${roomNumber}`;

      await prisma.bed.create({
        data: {
          bedId: `${dept.prefix}-${String(i).padStart(3, "0")}`,
          division: dept.name,
          location,
          status: "AVAILABLE",
          patientName: null,
          usedUntil: null,
        },
      });

      bedsInRoom++;

      // Move to next room when room is full
      if (bedsInRoom >= dept.bedsPerRoom) {
        roomCount++;
        bedsInRoom = 0;
      }
    }
    console.log(`✅ Seeded ${dept.totalBeds} beds for ${dept.name}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

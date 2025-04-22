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
  for (const department of departments) {
    let currentRoomNumber = department.floor * 100; // Start Room based on Floor, e.g., 500
    let bedsInCurrentRoom = 0;

    for (let i = 1; i <= department.totalBeds; i++) {
      await prisma.bed.create({
        data: {
          bedId: `${department.prefix}-${String(i).padStart(3, "0")}`,
          division: department.name,
          location: `Floor ${department.floor}, Room ${currentRoomNumber}`,
          status: "AVAILABLE",
          patientName: null,
          usedUntil: null,
        },
      });

      bedsInCurrentRoom++;

      if (bedsInCurrentRoom >= department.bedsPerRoom) {
        // After filling the room, move to next room
        currentRoomNumber++;
        bedsInCurrentRoom = 0;
      }
    }
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

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    const staffList = [
        {
          name: "Alice Johnson",
          staffId: "ADM001",
          role: "Administrator",
          department: "Administration",
          schedules: [
            { day: "Monday", startTime: "08:00", endTime: "16:00" },
            { day: "Wednesday", startTime: "09:00", endTime: "17:00" },
            { day: "Friday", startTime: "08:00", endTime: "14:00" },
          ],
        },
        {
          name: "Dr. James Patel",
          staffId: "DOC002",
          role: "Senior Consultant",
          department: "Cardiology",
          schedules: [
            { day: "Tuesday", startTime: "13:00", endTime: "21:00" },
            { day: "Thursday", startTime: "10:00", endTime: "18:00" },
          ],
        },
        {
          name: "Nurse Emily Tran",
          staffId: "NRS003",
          role: "Registered Nurse",
          department: "Emergency",
          schedules: [
            { day: "Monday", startTime: "22:00", endTime: "06:00" },
            { day: "Wednesday", startTime: "22:00", endTime: "06:00" },
          ],
        },
      ];      

  for (const staff of staffList) {
    await prisma.staff.upsert({
      where: { staffId: staff.staffId },
      update: {},
      create: {
        name: staff.name,
        staffId: staff.staffId,
        role: staff.role,
        department: staff.department,
        schedules: {
          create: staff.schedules,
        },
      },
    });
  }

  console.log("✅ Seeded staff with weekly schedules!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

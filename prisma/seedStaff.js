const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const staffList = [
    {
      name: "Alice Johnson",
      staffId: "ADM001",
      role: "Administrator",
      department: "Administration",
      weekStart: new Date("2025-05-12"), // Monday of that week
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
      weekStart: new Date("2025-05-12"),
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
      weekStart: new Date("2025-05-12"),
      schedules: [
        { day: "Monday", startTime: "22:00", endTime: "06:00" },
        { day: "Wednesday", startTime: "22:00", endTime: "06:00" },
      ],
    },
    {
      name: "Dr. Mia Nguyen",
      staffId: "DOC004",
      role: "Registrar",
      department: "Oncology",
      weekStart: new Date("2025-05-12"),
      schedules: [
        { day: "Monday", startTime: "08:00", endTime: "15:00" },
        { day: "Tuesday", startTime: "08:00", endTime: "15:00" },
      ],
    },
    {
      name: "Ben Richards",
      staffId: "ADM005",
      role: "Administrator",
      department: "Human Resources",
      weekStart: new Date("2025-05-12"),
      schedules: [
        { day: "Thursday", startTime: "09:00", endTime: "17:00" },
      ],
    },
    {
      name: "Nurse Olivia Kim",
      staffId: "NRS006",
      role: "Enrolled Nurse",
      department: "Ward B",
      weekStart: new Date("2025-05-12"),
      schedules: [
        { day: "Friday", startTime: "07:00", endTime: "15:00" },
        { day: "Saturday", startTime: "07:00", endTime: "15:00" },
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
          create: staff.schedules.map((s) => ({
            ...s,
            weekStart: staff.weekStart,
          })),
        },
      },
    });
  }

  console.log("✅ Seeded multiple staff with weekly schedules!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

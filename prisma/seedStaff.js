const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const staffList = [
  {
    "name": "Alice Johnson",
    "staffId": "ADM001",
    "role": "Administrator",
    "department": "Administration",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Friday",
        "startTime": "08:00",
        "endTime": "17:00"
      },
      {
        "day": "Tuesday",
        "startTime": "07:00",
        "endTime": "14:00"
      },
      {
        "day": "Saturday",
        "startTime": "06:00",
        "endTime": "13:00"
      },
      {
        "day": "Monday",
        "startTime": "08:00",
        "endTime": "15:00"
      },
      {
        "day": "Thursday",
        "startTime": "06:00",
        "endTime": "14:00"
      }
    ]
  },
  {
    "name": "Ben Richards",
    "staffId": "ADM002",
    "role": "Administrator",
    "department": "Administration",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Sunday",
        "startTime": "07:00",
        "endTime": "16:00"
      },
      {
        "day": "Monday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Tuesday",
        "startTime": "07:00",
        "endTime": "16:00"
      },
      {
        "day": "Friday",
        "startTime": "09:00",
        "endTime": "18:00"
      },
      {
        "day": "Thursday",
        "startTime": "06:00",
        "endTime": "13:00"
      }
    ]
  },
  {
    "name": "Liam Parker",
    "staffId": "ADM003",
    "role": "Administrator",
    "department": "Human Resources",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Thursday",
        "startTime": "10:00",
        "endTime": "18:00"
      },
      {
        "day": "Tuesday",
        "startTime": "06:00",
        "endTime": "13:00"
      },
      {
        "day": "Saturday",
        "startTime": "09:00",
        "endTime": "16:00"
      },
      {
        "day": "Wednesday",
        "startTime": "09:00",
        "endTime": "18:00"
      },
      {
        "day": "Monday",
        "startTime": "10:00",
        "endTime": "19:00"
      }
    ]
  },
  {
    "name": "Emily Tran",
    "staffId": "REG004",
    "role": "Registered Nurse",
    "department": "Emergency",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Sunday",
        "startTime": "07:00",
        "endTime": "15:00"
      },
      {
        "day": "Saturday",
        "startTime": "10:00",
        "endTime": "17:00"
      },
      {
        "day": "Wednesday",
        "startTime": "07:00",
        "endTime": "16:00"
      },
      {
        "day": "Thursday",
        "startTime": "08:00",
        "endTime": "15:00"
      },
      {
        "day": "Friday",
        "startTime": "07:00",
        "endTime": "16:00"
      }
    ]
  },
  {
    "name": "Noah Davis",
    "staffId": "REG005",
    "role": "Registered Nurse",
    "department": "Emergency",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Monday",
        "startTime": "07:00",
        "endTime": "15:00"
      },
      {
        "day": "Thursday",
        "startTime": "08:00",
        "endTime": "15:00"
      },
      {
        "day": "Sunday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Wednesday",
        "startTime": "08:00",
        "endTime": "15:00"
      },
      {
        "day": "Tuesday",
        "startTime": "06:00",
        "endTime": "13:00"
      }
    ]
  },
  {
    "name": "Olivia Kim",
    "staffId": "REG006",
    "role": "Registered Nurse",
    "department": "Ward B",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Saturday",
        "startTime": "10:00",
        "endTime": "17:00"
      },
      {
        "day": "Friday",
        "startTime": "09:00",
        "endTime": "18:00"
      },
      {
        "day": "Sunday",
        "startTime": "06:00",
        "endTime": "13:00"
      },
      {
        "day": "Tuesday",
        "startTime": "10:00",
        "endTime": "19:00"
      },
      {
        "day": "Wednesday",
        "startTime": "06:00",
        "endTime": "15:00"
      }
    ]
  },
  {
    "name": "Lucas Scott",
    "staffId": "REG007",
    "role": "Registered Nurse",
    "department": "Ward B",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Friday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Saturday",
        "startTime": "07:00",
        "endTime": "14:00"
      },
      {
        "day": "Tuesday",
        "startTime": "06:00",
        "endTime": "15:00"
      },
      {
        "day": "Wednesday",
        "startTime": "10:00",
        "endTime": "18:00"
      },
      {
        "day": "Monday",
        "startTime": "09:00",
        "endTime": "18:00"
      }
    ]
  },
  {
    "name": "Dr. Ethan Wright (Interventional Cardiologist)",
    "staffId": "DOC008",
    "role": "Senior Consultant",
    "department": "Cardiology",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Wednesday",
        "startTime": "07:00",
        "endTime": "15:00"
      },
      {
        "day": "Tuesday",
        "startTime": "09:00",
        "endTime": "16:00"
      },
      {
        "day": "Friday",
        "startTime": "09:00",
        "endTime": "16:00"
      },
      {
        "day": "Monday",
        "startTime": "06:00",
        "endTime": "15:00"
      },
      {
        "day": "Sunday",
        "startTime": "07:00",
        "endTime": "14:00"
      }
    ]
  },
  {
    "name": "Dr. Sophia Chen (Electrophysiologist)",
    "staffId": "DOC009",
    "role": "Senior Consultant",
    "department": "Cardiology",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Sunday",
        "startTime": "07:00",
        "endTime": "16:00"
      },
      {
        "day": "Wednesday",
        "startTime": "07:00",
        "endTime": "15:00"
      },
      {
        "day": "Thursday",
        "startTime": "09:00",
        "endTime": "18:00"
      },
      {
        "day": "Saturday",
        "startTime": "08:00",
        "endTime": "17:00"
      },
      {
        "day": "Tuesday",
        "startTime": "09:00",
        "endTime": "18:00"
      }
    ]
  },
  {
    "name": "Dr. Marcus Reynolds (Cardiac Surgeon)",
    "staffId": "DOC010",
    "role": "Senior Consultant",
    "department": "Cardiology",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Sunday",
        "startTime": "07:00",
        "endTime": "15:00"
      },
      {
        "day": "Wednesday",
        "startTime": "06:00",
        "endTime": "15:00"
      },
      {
        "day": "Thursday",
        "startTime": "08:00",
        "endTime": "15:00"
      },
      {
        "day": "Saturday",
        "startTime": "06:00",
        "endTime": "13:00"
      },
      {
        "day": "Friday",
        "startTime": "10:00",
        "endTime": "18:00"
      }
    ]
  },
  {
    "name": "Dr. Olivia Park (Movement Disorder Specialist)",
    "staffId": "DOC011",
    "role": "Senior Consultant",
    "department": "Neurology",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Saturday",
        "startTime": "06:00",
        "endTime": "14:00"
      },
      {
        "day": "Tuesday",
        "startTime": "06:00",
        "endTime": "13:00"
      },
      {
        "day": "Thursday",
        "startTime": "09:00",
        "endTime": "18:00"
      },
      {
        "day": "Sunday",
        "startTime": "07:00",
        "endTime": "15:00"
      },
      {
        "day": "Friday",
        "startTime": "07:00",
        "endTime": "15:00"
      }
    ]
  },
  {
    "name": "Dr. Nathan Brooks (Epileptologist)",
    "staffId": "DOC012",
    "role": "Senior Consultant",
    "department": "Neurology",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Saturday",
        "startTime": "08:00",
        "endTime": "16:00"
      },
      {
        "day": "Friday",
        "startTime": "09:00",
        "endTime": "16:00"
      },
      {
        "day": "Monday",
        "startTime": "09:00",
        "endTime": "18:00"
      },
      {
        "day": "Wednesday",
        "startTime": "07:00",
        "endTime": "15:00"
      },
      {
        "day": "Tuesday",
        "startTime": "10:00",
        "endTime": "19:00"
      }
    ]
  },
  {
    "name": "Dr. Aisha Khan (Neuroimmunologist)",
    "staffId": "DOC013",
    "role": "Senior Consultant",
    "department": "Neurology",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Monday",
        "startTime": "06:00",
        "endTime": "14:00"
      },
      {
        "day": "Friday",
        "startTime": "07:00",
        "endTime": "15:00"
      },
      {
        "day": "Saturday",
        "startTime": "06:00",
        "endTime": "13:00"
      },
      {
        "day": "Thursday",
        "startTime": "09:00",
        "endTime": "18:00"
      },
      {
        "day": "Wednesday",
        "startTime": "07:00",
        "endTime": "15:00"
      }
    ]
  },
  {
    "name": "Dr. Liam Foster (General Pediatrician)",
    "staffId": "DOC014",
    "role": "Senior Consultant",
    "department": "Pediatrics",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Wednesday",
        "startTime": "10:00",
        "endTime": "19:00"
      },
      {
        "day": "Saturday",
        "startTime": "09:00",
        "endTime": "16:00"
      },
      {
        "day": "Friday",
        "startTime": "07:00",
        "endTime": "15:00"
      },
      {
        "day": "Monday",
        "startTime": "09:00",
        "endTime": "18:00"
      },
      {
        "day": "Tuesday",
        "startTime": "09:00",
        "endTime": "18:00"
      }
    ]
  },
  {
    "name": "Dr. Isabella Wong (Pediatric Cardiologist)",
    "staffId": "DOC015",
    "role": "Senior Consultant",
    "department": "Pediatrics",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Thursday",
        "startTime": "10:00",
        "endTime": "19:00"
      },
      {
        "day": "Monday",
        "startTime": "08:00",
        "endTime": "15:00"
      },
      {
        "day": "Sunday",
        "startTime": "06:00",
        "endTime": "15:00"
      },
      {
        "day": "Tuesday",
        "startTime": "10:00",
        "endTime": "18:00"
      },
      {
        "day": "Saturday",
        "startTime": "10:00",
        "endTime": "19:00"
      }
    ]
  },
  {
    "name": "Dr. Caleb Rivera (Pediatric Neurologist)",
    "staffId": "DOC016",
    "role": "Senior Consultant",
    "department": "Pediatrics",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Wednesday",
        "startTime": "08:00",
        "endTime": "15:00"
      },
      {
        "day": "Thursday",
        "startTime": "07:00",
        "endTime": "14:00"
      },
      {
        "day": "Sunday",
        "startTime": "10:00",
        "endTime": "19:00"
      },
      {
        "day": "Friday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Tuesday",
        "startTime": "08:00",
        "endTime": "16:00"
      }
    ]
  },
  {
    "name": "Dr. Hannah Pierce (Sports Medicine)",
    "staffId": "DOC017",
    "role": "Senior Consultant",
    "department": "Orthopedics",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Friday",
        "startTime": "07:00",
        "endTime": "16:00"
      },
      {
        "day": "Thursday",
        "startTime": "06:00",
        "endTime": "15:00"
      },
      {
        "day": "Tuesday",
        "startTime": "06:00",
        "endTime": "14:00"
      },
      {
        "day": "Saturday",
        "startTime": "07:00",
        "endTime": "16:00"
      },
      {
        "day": "Wednesday",
        "startTime": "08:00",
        "endTime": "15:00"
      }
    ]
  },
  {
    "name": "Dr. Derek Coleman (Spinal Surgeon)",
    "staffId": "DOC018",
    "role": "Senior Consultant",
    "department": "Orthopedics",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Sunday",
        "startTime": "08:00",
        "endTime": "16:00"
      },
      {
        "day": "Friday",
        "startTime": "10:00",
        "endTime": "18:00"
      },
      {
        "day": "Tuesday",
        "startTime": "08:00",
        "endTime": "15:00"
      },
      {
        "day": "Monday",
        "startTime": "06:00",
        "endTime": "15:00"
      },
      {
        "day": "Wednesday",
        "startTime": "08:00",
        "endTime": "16:00"
      }
    ]
  },
  {
    "name": "Dr. Zoe Ramirez (Joint Replacement Specialist)",
    "staffId": "DOC019",
    "role": "Senior Consultant",
    "department": "Orthopedics",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Tuesday",
        "startTime": "10:00",
        "endTime": "19:00"
      },
      {
        "day": "Wednesday",
        "startTime": "07:00",
        "endTime": "16:00"
      },
      {
        "day": "Saturday",
        "startTime": "09:00",
        "endTime": "16:00"
      },
      {
        "day": "Sunday",
        "startTime": "09:00",
        "endTime": "16:00"
      },
      {
        "day": "Thursday",
        "startTime": "09:00",
        "endTime": "18:00"
      }
    ]
  },
  {
    "name": "Dr. Evelyn Shaw (Medical Oncologist)",
    "staffId": "DOC020",
    "role": "Senior Consultant",
    "department": "Oncology",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Tuesday",
        "startTime": "06:00",
        "endTime": "15:00"
      },
      {
        "day": "Wednesday",
        "startTime": "10:00",
        "endTime": "17:00"
      },
      {
        "day": "Friday",
        "startTime": "08:00",
        "endTime": "17:00"
      },
      {
        "day": "Monday",
        "startTime": "07:00",
        "endTime": "14:00"
      },
      {
        "day": "Sunday",
        "startTime": "06:00",
        "endTime": "14:00"
      }
    ]
  },
  {
    "name": "Dr. Julian Torres (Radiation Oncologist)",
    "staffId": "DOC021",
    "role": "Senior Consultant",
    "department": "Oncology",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Sunday",
        "startTime": "08:00",
        "endTime": "17:00"
      },
      {
        "day": "Tuesday",
        "startTime": "08:00",
        "endTime": "15:00"
      },
      {
        "day": "Wednesday",
        "startTime": "07:00",
        "endTime": "14:00"
      },
      {
        "day": "Monday",
        "startTime": "10:00",
        "endTime": "19:00"
      },
      {
        "day": "Friday",
        "startTime": "10:00",
        "endTime": "19:00"
      }
    ]
  },
  {
    "name": "Dr. Naomi Patel (Hematologist)",
    "staffId": "DOC022",
    "role": "Senior Consultant",
    "department": "Oncology",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Saturday",
        "startTime": "08:00",
        "endTime": "17:00"
      },
      {
        "day": "Sunday",
        "startTime": "07:00",
        "endTime": "14:00"
      },
      {
        "day": "Wednesday",
        "startTime": "06:00",
        "endTime": "15:00"
      },
      {
        "day": "Thursday",
        "startTime": "08:00",
        "endTime": "15:00"
      },
      {
        "day": "Tuesday",
        "startTime": "10:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "name": "Dr. Vincent Cho (Hepatologist)",
    "staffId": "DOC023",
    "role": "Senior Consultant",
    "department": "Gastroenterology",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Sunday",
        "startTime": "10:00",
        "endTime": "17:00"
      },
      {
        "day": "Thursday",
        "startTime": "06:00",
        "endTime": "14:00"
      },
      {
        "day": "Saturday",
        "startTime": "06:00",
        "endTime": "14:00"
      },
      {
        "day": "Wednesday",
        "startTime": "09:00",
        "endTime": "18:00"
      },
      {
        "day": "Tuesday",
        "startTime": "10:00",
        "endTime": "19:00"
      }
    ]
  },
  {
    "name": "Dr. Audrey Simmons (Endoscopist)",
    "staffId": "DOC024",
    "role": "Senior Consultant",
    "department": "Gastroenterology",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Thursday",
        "startTime": "06:00",
        "endTime": "15:00"
      },
      {
        "day": "Saturday",
        "startTime": "09:00",
        "endTime": "18:00"
      },
      {
        "day": "Monday",
        "startTime": "06:00",
        "endTime": "14:00"
      },
      {
        "day": "Friday",
        "startTime": "07:00",
        "endTime": "15:00"
      },
      {
        "day": "Wednesday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "name": "Dr. Dominic Ferraro (IBD Specialist)",
    "staffId": "DOC025",
    "role": "Senior Consultant",
    "department": "Gastroenterology",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Tuesday",
        "startTime": "06:00",
        "endTime": "14:00"
      },
      {
        "day": "Sunday",
        "startTime": "07:00",
        "endTime": "15:00"
      },
      {
        "day": "Wednesday",
        "startTime": "07:00",
        "endTime": "16:00"
      },
      {
        "day": "Monday",
        "startTime": "10:00",
        "endTime": "18:00"
      },
      {
        "day": "Saturday",
        "startTime": "07:00",
        "endTime": "14:00"
      }
    ]
  },
  {
    "name": "Dr. Samantha Hughes (Critical Care)",
    "staffId": "DOC026",
    "role": "Senior Consultant",
    "department": "Pulmonology",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Sunday",
        "startTime": "06:00",
        "endTime": "14:00"
      },
      {
        "day": "Tuesday",
        "startTime": "07:00",
        "endTime": "15:00"
      },
      {
        "day": "Thursday",
        "startTime": "08:00",
        "endTime": "17:00"
      },
      {
        "day": "Saturday",
        "startTime": "10:00",
        "endTime": "17:00"
      },
      {
        "day": "Friday",
        "startTime": "06:00",
        "endTime": "14:00"
      }
    ]
  },
  {
    "name": "Dr. Theodore Grant (Sleep Medicine)",
    "staffId": "DOC027",
    "role": "Senior Consultant",
    "department": "Pulmonology",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Thursday",
        "startTime": "10:00",
        "endTime": "18:00"
      },
      {
        "day": "Tuesday",
        "startTime": "06:00",
        "endTime": "15:00"
      },
      {
        "day": "Friday",
        "startTime": "06:00",
        "endTime": "13:00"
      },
      {
        "day": "Saturday",
        "startTime": "10:00",
        "endTime": "17:00"
      },
      {
        "day": "Monday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "name": "Dr. Priya Malhotra (Interventional Pulmonologist)",
    "staffId": "DOC028",
    "role": "Senior Consultant",
    "department": "Pulmonology",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Monday",
        "startTime": "08:00",
        "endTime": "17:00"
      },
      {
        "day": "Sunday",
        "startTime": "10:00",
        "endTime": "19:00"
      },
      {
        "day": "Wednesday",
        "startTime": "08:00",
        "endTime": "17:00"
      },
      {
        "day": "Saturday",
        "startTime": "07:00",
        "endTime": "14:00"
      },
      {
        "day": "Friday",
        "startTime": "09:00",
        "endTime": "18:00"
      }
    ]
  },
  {
    "name": "Dr. Daniel Kim (Diabetologist)",
    "staffId": "DOC029",
    "role": "Senior Consultant",
    "department": "Endocrinology",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Monday",
        "startTime": "10:00",
        "endTime": "19:00"
      },
      {
        "day": "Tuesday",
        "startTime": "10:00",
        "endTime": "17:00"
      },
      {
        "day": "Friday",
        "startTime": "07:00",
        "endTime": "15:00"
      },
      {
        "day": "Sunday",
        "startTime": "08:00",
        "endTime": "17:00"
      },
      {
        "day": "Saturday",
        "startTime": "06:00",
        "endTime": "14:00"
      }
    ]
  },
  {
    "name": "Dr. Rachel Nguyen (Thyroid Specialist)",
    "staffId": "DOC030",
    "role": "Senior Consultant",
    "department": "Endocrinology",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Monday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Tuesday",
        "startTime": "06:00",
        "endTime": "15:00"
      },
      {
        "day": "Friday",
        "startTime": "06:00",
        "endTime": "13:00"
      },
      {
        "day": "Wednesday",
        "startTime": "08:00",
        "endTime": "16:00"
      },
      {
        "day": "Sunday",
        "startTime": "08:00",
        "endTime": "15:00"
      }
    ]
  },
  {
    "name": "Dr. Gabriel Silva (Metabolic Bone Disease)",
    "staffId": "DOC031",
    "role": "Senior Consultant",
    "department": "Endocrinology",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Friday",
        "startTime": "07:00",
        "endTime": "16:00"
      },
      {
        "day": "Sunday",
        "startTime": "08:00",
        "endTime": "15:00"
      },
      {
        "day": "Thursday",
        "startTime": "10:00",
        "endTime": "18:00"
      },
      {
        "day": "Tuesday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Wednesday",
        "startTime": "10:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "name": "Dr. Maya Patel (Lupus Specialist)",
    "staffId": "DOC032",
    "role": "Senior Consultant",
    "department": "Rheumatology",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Monday",
        "startTime": "09:00",
        "endTime": "16:00"
      },
      {
        "day": "Sunday",
        "startTime": "08:00",
        "endTime": "16:00"
      },
      {
        "day": "Thursday",
        "startTime": "09:00",
        "endTime": "16:00"
      },
      {
        "day": "Wednesday",
        "startTime": "10:00",
        "endTime": "19:00"
      },
      {
        "day": "Tuesday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  },
  {
    "name": "Dr. Connor Fitzgerald (Vasculitis Expert)",
    "staffId": "DOC033",
    "role": "Senior Consultant",
    "department": "Rheumatology",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Wednesday",
        "startTime": "08:00",
        "endTime": "17:00"
      },
      {
        "day": "Sunday",
        "startTime": "09:00",
        "endTime": "16:00"
      },
      {
        "day": "Thursday",
        "startTime": "08:00",
        "endTime": "15:00"
      },
      {
        "day": "Monday",
        "startTime": "08:00",
        "endTime": "17:00"
      },
      {
        "day": "Saturday",
        "startTime": "06:00",
        "endTime": "14:00"
      }
    ]
  },
  {
    "name": "Dr. Jasmine Zhao (Pediatric Rheumatologist)",
    "staffId": "DOC034",
    "role": "Senior Consultant",
    "department": "Rheumatology",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Wednesday",
        "startTime": "08:00",
        "endTime": "17:00"
      },
      {
        "day": "Saturday",
        "startTime": "10:00",
        "endTime": "19:00"
      },
      {
        "day": "Monday",
        "startTime": "06:00",
        "endTime": "13:00"
      },
      {
        "day": "Tuesday",
        "startTime": "10:00",
        "endTime": "17:00"
      },
      {
        "day": "Sunday",
        "startTime": "09:00",
        "endTime": "18:00"
      }
    ]
  },
  {
    "name": "Dr. Elijah Thompson (Dialysis Director)",
    "staffId": "DOC035",
    "role": "Senior Consultant",
    "department": "Nephrology",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Monday",
        "startTime": "06:00",
        "endTime": "13:00"
      },
      {
        "day": "Sunday",
        "startTime": "10:00",
        "endTime": "19:00"
      },
      {
        "day": "Saturday",
        "startTime": "09:00",
        "endTime": "18:00"
      },
      {
        "day": "Friday",
        "startTime": "08:00",
        "endTime": "16:00"
      },
      {
        "day": "Tuesday",
        "startTime": "10:00",
        "endTime": "19:00"
      }
    ]
  },
  {
    "name": "Dr. Valentina Costa (Transplant Nephrologist)",
    "staffId": "DOC036",
    "role": "Senior Consultant",
    "department": "Nephrology",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Wednesday",
        "startTime": "07:00",
        "endTime": "15:00"
      },
      {
        "day": "Thursday",
        "startTime": "06:00",
        "endTime": "14:00"
      },
      {
        "day": "Sunday",
        "startTime": "07:00",
        "endTime": "14:00"
      },
      {
        "day": "Tuesday",
        "startTime": "08:00",
        "endTime": "15:00"
      },
      {
        "day": "Friday",
        "startTime": "08:00",
        "endTime": "15:00"
      }
    ]
  },
  {
    "name": "Dr. Simon Wu (Hypertension Specialist)",
    "staffId": "DOC037",
    "role": "Senior Consultant",
    "department": "Nephrology",
    "weekStart": "2025-05-12T00:00:00",
    "schedules": [
      {
        "day": "Saturday",
        "startTime": "10:00",
        "endTime": "18:00"
      },
      {
        "day": "Monday",
        "startTime": "09:00",
        "endTime": "18:00"
      },
      {
        "day": "Wednesday",
        "startTime": "09:00",
        "endTime": "18:00"
      },
      {
        "day": "Thursday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Tuesday",
        "startTime": "09:00",
        "endTime": "18:00"
      }
    ]
  }
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
            weekStart: new Date(staff.weekStart),
          })),
        },
      },
    });
  }

  console.log("✅ Seeded staff with randomized weekly schedules!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

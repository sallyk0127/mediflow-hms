import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const medicines = [
  {
    name: 'Albuterol (salbutamol)',
    type: 'Inhaler',
    price: 28.55,
    stock: 100,
    expiry: new Date('2026-06-01'),
    manufacturer: "John's Health Care",
    code: 'ALSXEC0123',
  },
  {
    name: 'Amoxicillin 250 mg',
    type: 'Tablet',
    price: 40.55,
    stock: 28,
    expiry: new Date('2026-07-21'),
    manufacturer: 'Pattikson Pvt Ltd',
    code: 'AMSXEC0043',
  },
  {
    name: 'Aspirin 300 mg',
    type: 'Tablet',
    price: 28.55,
    stock: 190,
    expiry: new Date('2027-06-01'),
    manufacturer: "David's Ltd",
    code: 'ASPKC01010',
  },
  {
    name: 'Paracetamol 500 mg',
    type: 'Tablet',
    price: 18.99,
    stock: 500,
    expiry: new Date('2026-11-15'),
    manufacturer: 'HealLife Pharma',
    code: 'PAR500Z019',
  },
  {
    name: 'Ceftriaxone 1g',
    type: 'Injection',
    price: 60.75,
    stock: 75,
    expiry: new Date('2026-08-30'),
    manufacturer: 'Medcore Labs',
    code: 'CEF1GIV831',
  },
  {
    name: 'Metformin 850 mg',
    type: 'Tablet',
    price: 22.5,
    stock: 300,
    expiry: new Date('2027-02-10'),
    manufacturer: 'WellCure Ltd',
    code: 'METF850WRQ',
  },
  {
    name: 'Ibuprofen 400 mg',
    type: 'Tablet',
    price: 19.8,
    stock: 400,
    expiry: new Date('2027-01-01'),
    manufacturer: 'NovaHeal Pharma',
    code: 'IBU400P014',
  },
  {
    name: 'Hydrocortisone Cream 1%',
    type: 'Topical',
    price: 12.35,
    stock: 150,
    expiry: new Date('2026-10-10'),
    manufacturer: 'SkinMed Pty Ltd',
    code: 'HYDC1CRM62',
  },
  {
    name: 'Lisinopril 10 mg',
    type: 'Tablet',
    price: 25.45,
    stock: 200,
    expiry: new Date('2027-04-01'),
    manufacturer: 'CardioCare Inc',
    code: 'LIS10MGV25',
  },
  {
    name: 'Gentamicin Eye Drops',
    type: 'Drops (Eye/Ear/Nose)',
    price: 14.2,
    stock: 80,
    expiry: new Date('2026-12-18'),
    manufacturer: 'VisionWell Ltd',
    code: 'GENED0512',
  },
  {
    name: 'Omeprazole 20 mg',
    type: 'Capsule',
    price: 32.0,
    stock: 350,
    expiry: new Date('2026-09-05'),
    manufacturer: 'Digest Pharma',
    code: 'OME20CPC99',
  },
  {
    name: 'Insulin Glargine',
    type: 'Injection',
    price: 85.9,
    stock: 65,
    expiry: new Date('2026-08-12'),
    manufacturer: 'BioInject Ltd',
    code: 'INSGLA9987',
  },
  {
    name: 'Nitroglycerin Patch',
    type: 'Patch',
    price: 45.0,
    stock: 110,
    expiry: new Date('2027-03-28'),
    manufacturer: 'HeartEase Corp',
    code: 'NITRPT4020',
  },
  {
    name: 'Docusate Sodium 100 mg',
    type: 'Capsule',
    price: 15.75,
    stock: 120,
    expiry: new Date('2026-07-14'),
    manufacturer: 'GutWell Pharma',
    code: 'DOCUS100XT',
  },
  {
    name: 'Ranitidine 150 mg',
    type: 'Tablet',
    price: 20.65,
    stock: 220,
    expiry: new Date('2026-10-01'),
    manufacturer: 'StomachSafe Ltd',
    code: 'RANITD150Z',
  },
];

  for (const med of medicines) {
    await prisma.medicine.upsert({
      where: { code: med.code },
      update: {},
      create: med,
    });
  }
}

main()
  .then(() => console.log('✅ Medicines seeded'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

const TITLES = ["Mr", "Mrs", "Miss", "Dr", "Ms", "Mx", "Sir", "Dame", "Dr", "Cllr", "Lady", "Lord", "General", "Captain", "Father", "Doctor", "Earl"];
const GENDERS = ["Male", "Female", "Other"];
const MARITAL_STATUS = ["Single", "Married", "Widowed", "Divorced", "Separated", "Registered partnership"];
const COVERAGE = ["Public", "Private"];
const PAYMENT_METHODS = ["Cash", "Credit Card", "Insurance"];
const STATES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];

function generateAustralianPhone() {
    return `04${faker.string.numeric(8)}`;
  }
  
  function generateAustralianAddress() {
    return `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.helpers.arrayElement(STATES)} ${faker.location.zipCode('2###')}, Australia`;
  }
  
  function generateRandomPatient() {
    const gender = faker.helpers.arrayElement(GENDERS);
    const firstName = faker.person.firstName(gender.toLowerCase());
    const lastName = faker.person.lastName();
  
    return {
      title: faker.helpers.arrayElement(TITLES),
      firstName,
      middleName: faker.person.middleName(),
      lastName,
      gender,
      preferredName: faker.person.firstName(),
      dob: faker.date.birthdate({ min: 18, max: 90, mode: 'age' }),
      maritalStatus: faker.helpers.arrayElement(MARITAL_STATUS),
      email: faker.internet.email({ firstName, lastName }),
      phoneNumber: generateAustralianPhone(),
      address: generateAustralianAddress(),
      emergencyContactName: faker.person.fullName(),
      emergencyContactNumber: generateAustralianPhone(),
      billingNote: faker.lorem.sentence(),
      previousNames: faker.person.fullName(),
  
      medicareNumber: faker.string.numeric(10),
      insuranceProvider: faker.company.name(),
      policyNumber: faker.string.alphanumeric(8).toUpperCase(),
      coverageType: faker.helpers.arrayElement(COVERAGE),
      billingAddress: generateAustralianAddress(),
      paymentMethod: faker.helpers.arrayElement(PAYMENT_METHODS),
      assignedRoom: null,
      Department: null,
      bedNumber: null,
      attendingDoctor: faker.person.fullName(),
  
      medicalHistory: faker.lorem.sentences(2),
      medications: faker.lorem.words(3),
      allergies: faker.lorem.word(),
      conditions: faker.lorem.words(2),
    };
  }
  
  async function main() {
    const numPatients = 40;
    for (let i = 0; i < numPatients; i++) {
      const data = generateRandomPatient();
      await prisma.patient.create({ data });
    }
  
    console.log(`✅ Seeded ${numPatients} Australian-style patients`);
  }
  
  main()
    .catch((e) => {
      console.error("❌ Error seeding patients:", e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  
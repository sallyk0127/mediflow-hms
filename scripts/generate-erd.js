const { execSync } = require("child_process");
const path = require("path");

const schemaPath = path.resolve(__dirname, "../prisma/schema.prisma");

try {
  console.log("📊 Generating ERD...");
  execSync(`npx prisma-erd-generator --schema ${schemaPath}`, { stdio: "inherit" });
  console.log("✅ ERD successfully generated.");
} catch (error) {
  console.error("❌ Failed to generate ERD:", error);
}

import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("admin123", 12);
  const user = await prisma.user.upsert({
    where: { email: "admin@arslan.com" },
    update: { password: password },
    create: {
        email: "admin@arslan.com",
        name: "Mehmet Arslan",
        password: password,
        role: "COMPANY_ADMIN"
    }
  });
  console.log("Password reset for:", user.email);
}

main().catch(console.error).finally(() => prisma.$disconnect());

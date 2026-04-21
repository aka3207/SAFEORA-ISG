import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("admin123", 12);

  // 1. Create a Tenant
  const tenant = await prisma.tenant.upsert({
    where: { slug: "arslan-lojistik" },
    update: {},
    create: {
      name: "Arslan Lojistik & Sanayi",
      slug: "arslan-lojistik",
      plan: "ENTERPRISE",
    },
  });

  // 2. Create Users (Roles)
  const users = [
    { email: "admin@arslan.com", name: "Mehmet Arslan", role: "COMPANY_ADMIN" },
    { email: "expert@arslan.com", name: "Selin Kalite", role: "SAFETY_EXPERT" },
    { email: "doctor@arslan.com", name: "Dr. Can Sağlık", role: "DOCTOR" },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        email: u.email,
        name: u.name,
        password,
        role: u.role as any,
        tenantId: tenant.id,
      },
    });
  }

  // 3. Create Branches & Departments
  const branches = await Promise.all([
    prisma.branch.create({
      data: {
        name: "Gebze Fabrika",
        city: "Kocaeli",
        tenantId: tenant.id,
        departments: {
          create: [
            { name: "Üretim Hattı" },
            { name: "Bakım Onarım" },
            { name: "Sevkiyat" },
          ],
        },
      },
      include: { departments: true },
    }),
    prisma.branch.create({
      data: {
        name: "Tuzla Lojistik Merkezi",
        city: "İstanbul",
        tenantId: tenant.id,
        departments: {
          create: [
            { name: "Depolama" },
            { name: "Araç Parkı" },
          ],
        },
      },
      include: { departments: true },
    }),
  ]);

  // 4. Create Employees
  const dept = branches[0].departments[0];
  const branch = branches[0];
  
  await prisma.employee.create({
    data: {
      firstName: "Ahmet",
      lastName: "Yılmaz",
      position: "Forklift Operatörü",
      tcNo: "12345678901",
      email: "ahmet@arslan.com",
      status: "ACTIVE",
      branchId: branch.id,
      departmentId: dept.id,
      tenantId: tenant.id,
    },
  });

  // 5. Create Risk Analysis
  await prisma.riskAnalysis.create({
    data: {
      title: "Yüksekte Çalışma",
      description: "Vinç bakımı sırasında düşme riski.",
      hazardSource: "Yükseklik",
      severity: 4,
      probability: 3,
      riskScore: 12,
      status: "OPEN",
      tenantId: tenant.id,
    },
  });

  // 6. Create Incident
  await prisma.incident.create({
    data: {
      title: "Ramak Kala: Forklift Devrilmesi",
      description: "Hızlı dönüş sırasında yük kaydı.",
      type: "NEAR_MISS",
      date: new Date(),
      location: "B Bölgesi Girişi",
      severity: "MEDIUM",
      tenantId: tenant.id,
      branchId: branch.id,
    },
  });

  console.log("Seeding finished successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

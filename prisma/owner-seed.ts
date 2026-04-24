import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // 1. Create Founder
  const founder = await prisma.user.upsert({
    where: { email: 'founder@safeora.com' },
    update: {},
    create: {
      email: 'founder@safeora.com',
      name: 'Owner / Founder',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      isFounder: true,
    },
  });
  console.log('Founder created:', founder.email);

  // 2. Create some sample tenants
  const tenant1 = await prisma.tenant.upsert({
    where: { slug: 'globaltech' },
    update: {},
    create: {
      name: 'GlobalTech Solutions',
      slug: 'globaltech',
      plan: 'ENTERPRISE',
      status: 'ACTIVE',
      healthScore: 98,
    },
  });

  const tenant2 = await prisma.tenant.upsert({
    where: { slug: 'metalcraft' },
    update: {},
    create: {
      name: 'MetalCraft Inc',
      slug: 'metalcraft',
      plan: 'GROWTH',
      status: 'ACTIVE',
      healthScore: 45, // At risk!
    },
  });

  // 3. Create some leads
  await prisma.lead.createMany({
    data: [
      { companyName: 'Logistics Pro', contactName: 'John Doe', email: 'john@logistics.com', source: 'Website', status: 'NEW' },
      { companyName: 'FactoryX', contactName: 'Jane Smith', email: 'jane@factoryx.com', source: 'Referral', status: 'DEMO_BOOKED' },
    ],
  });

  console.log('Seed data added successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

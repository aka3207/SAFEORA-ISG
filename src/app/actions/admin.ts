"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

async function ensureFounder() {
  const session = await auth();
  const user = session?.user as any;
  if (!user || !user.isFounder) {
    throw new Error("Unauthorized: Founder access only");
  }
  return user;
}

export async function getAdminStats() {
  await ensureFounder();

  const [
    totalTenants,
    activeTenants,
    totalUsers,
    totalSubscriptions,
    recentTenants,
  ] = await Promise.all([
    prisma.tenant.count(),
    prisma.tenant.count({ where: { status: "ACTIVE" } }),
    prisma.user.count(),
    prisma.subscription.count(),
    prisma.tenant.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  // Mock revenue for now as we don't have full stripe integration yet
  const mrr = 142500; 
  const growth = 12.5;

  return {
    totalTenants,
    activeTenants,
    totalUsers,
    totalSubscriptions,
    mrr,
    growth,
    recentTenants,
  };
}

export async function getTenants() {
  await ensureFounder();
  return await prisma.tenant.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { users: true, employees: true }
      }
    }
  });
}

export async function updateTenantStatus(tenantId: string, status: any) {
  await ensureFounder();
  await prisma.tenant.update({
    where: { id: tenantId },
    data: { status },
  });
  revalidatePath("/admin/tenants");
}

export async function getGlobalUsers(query?: string) {
  await ensureFounder();
  return await prisma.user.findMany({
    where: query ? {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { email: { contains: query, mode: "insensitive" } },
      ]
    } : undefined,
    include: { tenant: true },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
}

export async function createLead(data: {
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  source?: string;
}) {
  return await prisma.lead.create({
    data: {
      ...data,
      status: "NEW",
    }
  });
}

export async function getLeads() {
  await ensureFounder();
  return await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function updateLeadStatus(leadId: string, status: string) {
  await ensureFounder();
  await prisma.lead.update({
    where: { id: leadId },
    data: { status },
  });
  revalidatePath("/admin/crm");
}

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
    totalExperts,
    totalVisits,
    overdueVisits,
    recentTenants,
  ] = await Promise.all([
    prisma.tenant.count(),
    prisma.tenant.count({ where: { status: "ACTIVE" } }),
    prisma.user.count({ where: { role: "SAFETY_EXPERT" } }),
    prisma.visit.count(),
    prisma.visit.count({ where: { status: "OVERDUE" } }),
    prisma.tenant.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { assignedExpert: true }
    }),
  ]);

  // Operational metrics
  const completedVisitsMonth = await prisma.visit.count({
    where: {
      status: "COMPLETED",
      completedAt: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      }
    }
  });

  const mrr = totalTenants * 1500; // Mock simplified revenue
  const growth = 12.5;

  return {
    totalTenants,
    activeTenants,
    totalExperts,
    totalVisits,
    overdueVisits,
    completedVisitsMonth,
    mrr,
    growth,
    recentTenants,
  };
}

export async function getExperts() {
  await ensureFounder();
  return await prisma.user.findMany({
    where: { role: "SAFETY_EXPERT" },
    select: { id: true, name: true, email: true }
  });
}

export async function createClientCompany(data: {
  name: string;
  taxNumber: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  sector: string;
  employeeCount: number;
  riskClass: string;
  assignedExpertId: string;
  visitFrequency: string;
  notes?: string;
}) {
  await ensureFounder();

  // Create the slug from name
  const slug = data.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

  const tenant = await prisma.tenant.create({
    data: {
      name: data.name,
      slug,
      taxNumber: data.taxNumber,
      contactPerson: data.contactPerson,
      phone: data.phone,
      email: data.email,
      address: data.address,
      sector: data.sector,
      employeeCount: data.employeeCount,
      riskClass: data.riskClass,
      assignedExpertId: data.assignedExpertId,
      visitFrequency: data.visitFrequency,
      notes: data.notes,
      status: "ACTIVE",
    }
  });

  // Automatically create the first visit
  await prisma.visit.create({
    data: {
      title: "İlk Tanışma ve İSG Kurulum Ziyareti",
      scheduledDate: new Date(),
      status: "UPCOMING",
      tenantId: tenant.id,
      expertId: data.assignedExpertId,
    }
  });

  revalidatePath("/admin/tenants");
  revalidatePath("/admin/dashboard");
  
  return tenant;
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

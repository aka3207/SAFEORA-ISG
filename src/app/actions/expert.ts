"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

async function ensureExpert() {
  const session = await auth();
  const user = session?.user as any;
  if (!user || user.role !== "SAFETY_EXPERT") {
    // Founders also count as experts for dashboard viewing if they want
    if (!user?.isFounder) throw new Error("Unauthorized: Expert access only");
  }
  return user;
}

export async function getExpertCompanies() {
  const user = await ensureExpert();
  
  // If isFounder, maybe see all? For now, if role is Expert, see assigned.
  // We'll filter strictly for assigned unless founder.
  const where = user.isFounder ? {} : { assignedExpertId: user.id };

  return await prisma.tenant.findMany({
    where,
    include: {
      _count: {
        select: { visits: true, employees: true, risks: true, incidents: true }
      },
      visits: {
        where: { status: "UPCOMING" },
        orderBy: { scheduledDate: "asc" },
        take: 1
      }
    },
    orderBy: { updatedAt: "desc" }
  });
}

export async function getExpertStats() {
  const user = await ensureExpert();
  const where = user.isFounder ? {} : { expertId: user.id };

  const [
    totalCompanies,
    upcomingVisits,
    overdueVisits,
    completedVisits
  ] = await Promise.all([
    prisma.tenant.count({ where: user.isFounder ? {} : { assignedExpertId: user.id } }),
    prisma.visit.count({ where: { ...where, status: "UPCOMING" } }),
    prisma.visit.count({ where: { ...where, status: "OVERDUE" } }),
    prisma.visit.count({ where: { ...where, status: "COMPLETED" } }),
  ]);

  return {
    totalCompanies,
    upcomingVisits,
    overdueVisits,
    completedVisits
  };
}

export async function submitVisitReport(data: {
  visitId: string;
  observations: string;
  unsafeConditions?: string;
  actionsRequired?: string;
  recommendation?: string;
}) {
  const user = await ensureExpert();

  const visit = await prisma.visit.update({
    where: { id: data.visitId },
    data: {
      status: "COMPLETED",
      completedAt: new Date(),
      report: {
        create: {
          observations: data.observations,
          unsafeConditions: data.unsafeConditions,
          actionsRequired: data.actionsRequired,
          recommendation: data.recommendation,
          date: new Date()
        }
      }
    }
  });

  // Automatically schedule the next visit (default 1 month later)
  const nextDate = new Date();
  nextDate.setMonth(nextDate.getMonth() + 1);

  await prisma.visit.create({
    data: {
      title: "Periyodik İSG Denetimi",
      scheduledDate: nextDate,
      status: "UPCOMING",
      tenantId: visit.tenantId,
      expertId: visit.expertId
    }
  });

  revalidatePath("/dashboard");
  return visit;
}

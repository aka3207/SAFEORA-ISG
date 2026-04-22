"use server";
import { auth } from "@/auth";

import prisma from "@/lib/prisma";


export async function createRisk(data: {
  title: string;
  description: string;
  hazardSource: string;
  severity: number;
  probability: number;
  assigneeId?: string;
  deadline?: string;
}) {
  const session = await auth();
  const user = session?.user as any;
  if (!user) throw new Error("Unauthorized");

  const riskScore = data.severity * data.probability;

  const risk = await prisma.riskAnalysis.create({
    data: {
      title: data.title,
      description: data.description || "",
      hazardSource: data.hazardSource,
      severity: data.severity,
      probability: data.probability,
      riskScore,
      status: "OPEN",
      tenantId: user.tenantId,
    },
  });

  // If an assignee and deadline are provided, auto-create a corrective action
  if (data.assigneeId && data.deadline) {
    await prisma.action.create({
      data: {
        title: `Düzeltici Faaliyet: ${data.title}`,
        description: `Risk kaydından otomatik oluşturuldu.`,
        priority: riskScore >= 12 ? "HIGH" : riskScore >= 5 ? "MEDIUM" : "LOW",
        status: "OPEN",
        deadline: new Date(data.deadline),
        riskId: risk.id,
        creatorId: user.id,
        assigneeId: data.assigneeId || undefined,
      },
    });
  }

  return risk;
}

export async function deleteRisk(id: string) {
  const session = await auth();
  const user = session?.user as any;
  if (!user) throw new Error("Unauthorized");

  await prisma.riskAnalysis.delete({
    where: { id, tenantId: user.tenantId },
  });
}

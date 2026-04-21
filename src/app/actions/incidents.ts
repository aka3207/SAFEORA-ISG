"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function reportIncident(data: {
  title: string;
  description: string;
  type: string;
  date: string;
  location?: string;
  severity?: string;
  branchId: string;
  photos?: string[];
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;
  if (!user) throw new Error("Unauthorized");

  const incident = await prisma.incident.create({
    data: {
      title: data.title,
      description: data.description,
      type: data.type,
      date: new Date(data.date),
      location: data.location || null,
      severity: data.severity || "MEDIUM",
      photos: data.photos && data.photos.length > 0 ? JSON.stringify(data.photos) : null,
      tenantId: user.tenantId,
      branchId: data.branchId,
    },
  });

  return incident;
}

export async function deleteIncident(id: string) {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;
  if (!user) throw new Error("Unauthorized");

  await prisma.incident.delete({
    where: { id, tenantId: user.tenantId },
  });
}

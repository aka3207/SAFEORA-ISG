"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createHealthRecord(data: {
  employeeId: string;
  type: string;
  date: string;
  findings?: string;
  results: string;
  nextExamDate?: string;
  doctorNotes?: string;
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;

  if (!user || user.role !== "DOCTOR") {
    throw new Error("Unauthorized: Only doctors can create health records.");
  }

  const record = await prisma.healthRecord.create({
    data: {
      ...data,
      date: new Date(data.date),
      nextExamDate: data.nextExamDate ? new Date(data.nextExamDate) : undefined,
    },
  });

  revalidatePath("/dashboard/health");
  return record;
}

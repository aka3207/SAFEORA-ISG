"use server";
import { auth } from "@/auth";

import prisma from "@/lib/prisma";

import { revalidatePath } from "next/cache";

export async function createTraining(data: {
  title: string;
  type: string;
  trainer: string;
  date: string;
  duration: number;
  description?: string;
}) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const user = session.user as any;
  
  await prisma.training.create({
    data: {
      title: data.title,
      type: data.type,
      trainer: data.trainer,
      date: new Date(data.date),
      duration: data.duration,
      description: data.description,
      tenantId: user.tenantId,
    },
  });

  revalidatePath("/dashboard/training");
}

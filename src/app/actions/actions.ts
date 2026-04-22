"use server";
import { auth } from "@/auth";

import prisma from "@/lib/prisma";

import { revalidatePath } from "next/cache";

export async function completeAction(id: string) {
  const session = await auth();
  const user = session?.user as any;

  if (!user) {
    throw new Error("Unauthorized");
  }

  // Update status
  const action = await prisma.action.update({
    where: { 
      id,
      // Security: Ensure the action belongs to the user's tenant
      creator: { tenantId: user.tenantId }
    },
    data: {
      status: "COMPLETED",
      completedAt: new Date(),
    },
  });

  revalidatePath("/dashboard/actions");
  return action;
}

export async function deleteAction(id: string) {
  const session = await auth();
  const user = session?.user as any;

  if (!user) {
    throw new Error("Unauthorized");
  }

  await prisma.action.delete({
    where: { 
      id,
      creator: { tenantId: user.tenantId }
    },
  });

  revalidatePath("/dashboard/actions");
}

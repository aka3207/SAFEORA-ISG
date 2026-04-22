"use server";
import { auth } from "@/auth";

import prisma from "@/lib/prisma";

import { revalidatePath } from "next/cache";

export async function createBranch(data: { name: string; city: string; address?: string }) {
  const session = await auth();
  const user = session?.user as any;

  if (!user || !user.tenantId) throw new Error("Unauthorized");

  const branch = await prisma.branch.create({
    data: {
      ...data,
      tenantId: user.tenantId,
    },
  });

  revalidatePath("/dashboard/settings/branches");
  return branch;
}

export async function createDepartment(data: { name: string; branchId: string }) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const dept = await prisma.department.create({
    data: {
      name: data.name,
      branchId: data.branchId,
    },
  });

  revalidatePath("/dashboard/settings/branches");
  return dept;
}

export async function deleteBranch(id: string) {
  const session = await auth();
  const user = session?.user as any;
  if (!user || !user.tenantId) throw new Error("Unauthorized");

  await prisma.branch.delete({
    where: { id, tenantId: user.tenantId },
  });

  revalidatePath("/dashboard/settings/branches");
}

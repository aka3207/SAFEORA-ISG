"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/lib/logger";

export async function createEmployee(data: {
  firstName: string;
  lastName: string;
  tcNo?: string;
  email?: string;
  phone?: string;
  position?: string;
  branchId: string;
  departmentId: string;
  startDate?: string;
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;

  if (!user || !user.tenantId) {
    throw new Error("Unauthorized");
  }

  const employee = await prisma.employee.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      tcNo: data.tcNo,
      email: data.email,
      phone: data.phone,
      position: data.position,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      tenantId: user.tenantId,
      branchId: data.branchId,
      departmentId: data.departmentId,
      status: "ACTIVE",
    },
  });

  // Log the activity
  await logActivity({
    action: "CREATE",
    entity: "Employee",
    entityId: employee.id,
    details: `${employee.firstName} ${employee.lastName} kaydı oluşturuldu.`,
    userId: user.id,
    tenantId: user.tenantId,
  });

  revalidatePath("/dashboard/employees");
  return employee;
}

export async function deleteEmployee(id: string) {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;

  if (!user || !user.tenantId) {
    throw new Error("Unauthorized");
  }

  // Ensure user can only delete from their own tenant
  await prisma.employee.delete({
    where: {
      id,
      tenantId: user.tenantId,
    },
  });

  revalidatePath("/dashboard/employees");
}

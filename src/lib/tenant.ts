import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

/**
 * Utility to get the current tenant ID from the session securely.
 * Throws an error if the user is not authenticated or has no tenant.
 */
export async function getTenantId() {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;
  
  if (!user || (!user.tenantId && user.role !== "SUPER_ADMIN")) {
    throw new Error("Unauthorized: No tenant context found.");
  }
  
  return user.tenantId;
}

/**
 * Example of a tenant-scoped query wrapper (simulated)
 * In a real production app, you might use Prisma middleware or extensions for this.
 */
export const tenantPrisma = {
  employee: {
    findMany: async (args: any) => {
      const tenantId = await getTenantId();
      return prisma.employee.findMany({
        ...args,
        where: { ...args.where, tenantId },
      });
    }
    // ... other methods
  }
};

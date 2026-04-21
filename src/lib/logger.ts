import prisma from "@/lib/prisma";

/**
 * Utility to log user activities for audit trail
 */
export async function logActivity(data: {
  action: "CREATE" | "UPDATE" | "DELETE" | "LOGIN" | "LOGOUT" | "EXPORT";
  entity: string;
  entityId?: string;
  details?: string;
  userId: string;
  tenantId: string;
}) {
  try {
    const log = await prisma.activityLog.create({
      data: {
        action: data.action,
        entity: data.entity,
        entityId: data.entityId,
        details: data.details,
        userId: data.userId,
        tenantId: data.tenantId,
      },
    });
    return log;
  } catch (error) {
    console.error("Activity Logging Failed:", error);
  }
}

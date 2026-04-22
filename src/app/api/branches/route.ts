import { auth } from "@/auth";
import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  const user = session?.user as any;

  if (!user || !user.tenantId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const branches = await prisma.branch.findMany({
    where: { tenantId: user.tenantId },
    include: { departments: true },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(branches);
}

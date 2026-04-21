import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
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

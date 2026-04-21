"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createDocument(data: {
  name: string;
  category: string;
  fileUrl: string;
  version: string;
  expiryDate?: string;
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;

  if (!user) throw new Error("Unauthorized");

  const document = await prisma.document.create({
    data: {
      ...data,
      expiryDate: data.expiryDate ? new Date(data.expiryDate) : undefined,
      tenantId: user.tenantId,
    },
  });

  revalidatePath("/dashboard/documents");
  return document;
}

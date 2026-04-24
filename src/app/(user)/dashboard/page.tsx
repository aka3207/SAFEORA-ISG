import { auth } from "@/auth";

import { redirect } from "next/navigation";
import { ExpertDashboard } from "@/components/dashboard/ExpertDashboard";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Page Heading Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Kullanıcı Paneli</h1>
          <p className="text-slate-500 font-medium">Hoş geldiniz! İşte bugünkü operasyonel özetiniz.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/reports" className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-all inline-block text-center">
            Rapor Al
          </Link>
          <Link href="/dashboard/incidents/new" className="px-4 py-2 bg-blue-600 rounded-xl text-sm font-bold text-white shadow-md shadow-blue-200 hover:bg-blue-700 transition-all inline-block text-center">
            Yeni Giriş Yap
          </Link>
        </div>
      </div>

      {/* Operational Dashboard for Experts & Clients */}
      <ExpertDashboard />
    </div>
  );
}

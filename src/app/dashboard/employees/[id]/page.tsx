import { auth } from "@/auth";
import prisma from "@/lib/prisma";

import { ArrowLeft, User, Mail, Phone, Calendar, Building2, ShieldCheck, FileText } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EmployeeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const session = await auth();
  const user = session?.user as any;

  const employee = await prisma.employee.findUnique({
    where: {
      id: resolvedParams.id,
      tenantId: user.tenantId,
    },
    include: {
      branch: true,
      department: true,
    }
  });

  if (!employee) {
    notFound();
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/employees" className="btn btn-outline" style={{ padding: "0.5rem" }}>
          <ArrowLeft size={20} />
        </Link>
        <h2 style={{ marginBottom: 0 }}>Çalışan Profili</h2>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-1 flex flex-col gap-6">
           <div className="glass-card flex flex-col items-center py-8">
              <div style={{ width: "120px", height: "120px", borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", fontWeight: "bold" }}>
                 {employee.firstName[0]}{employee.lastName[0]}
              </div>
              <h3 style={{ marginTop: "1.5rem", marginBottom: "0.25rem" }}>{employee.firstName} {employee.lastName}</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>{employee.position || "Pozisyon Belirtilmemiş"}</p>
              
              <div className="mt-6 w-full flex flex-col gap-2">
                 <div className={`badge flex items-center justify-center gap-2`} style={{ 
                   padding: "0.5rem", 
                   background: employee.status === "ACTIVE" ? "rgba(16, 185, 129, 0.1)" : "rgba(255,255,255,0.05)", 
                   color: employee.status === "ACTIVE" ? "var(--success)" : "var(--text-muted)" 
                 }}>
                    <ShieldCheck size={14} />
                    {employee.status === "ACTIVE" ? "Aktif Çalışan" : "Pasif"}
                 </div>
              </div>
           </div>

           <div className="glass-card">
              <h4 style={{ marginBottom: "1rem" }}>İletişim</h4>
              <div className="flex flex-col gap-4">
                 <div className="flex items-center gap-3">
                    <Mail size={16} style={{ color: "var(--text-muted)" }} />
                    <span style={{ fontSize: "0.875rem" }}>{employee.email || "E-posta yok"}</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <Phone size={16} style={{ color: "var(--text-muted)" }} />
                    <span style={{ fontSize: "0.875rem" }}>{employee.phone || "Telefon yok"}</span>
                 </div>
              </div>
           </div>
        </div>

        <div className="col-span-2 flex flex-col gap-6">
           <div className="glass-card">
              <h3 style={{ marginBottom: "1.5rem" }}>Kurumsal Detaylar</h3>
              <div className="grid grid-cols-2 gap-8">
                 <div className="flex flex-col gap-1">
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Şube</span>
                    <div className="flex items-center gap-2 font-medium">
                       <Building2 size={16} style={{ color: "var(--primary)" }} />
                       {employee.branch?.name}
                    </div>
                 </div>
                 <div className="flex flex-col gap-1">
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Departman</span>
                    <div className="flex items-center gap-2 font-medium">
                       <FileText size={16} style={{ color: "var(--primary)" }} />
                       {employee.department?.name}
                    </div>
                 </div>
                 <div className="flex flex-col gap-1">
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>İşe Giriş Tarihi</span>
                    <div className="flex items-center gap-2 font-medium">
                       <Calendar size={16} style={{ color: "var(--primary)" }} />
                       {employee.startDate ? new Date(employee.startDate).toLocaleDateString("tr-TR") : "-"}
                    </div>
                 </div>
                 <div className="flex flex-col gap-1">
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>TC No</span>
                    <div className="flex items-center gap-2 font-medium">
                       ****{employee.tcNo?.slice(-4) || "****"}
                    </div>
                 </div>
              </div>
           </div>

           <div className="glass-card">
              <h3 style={{ marginBottom: "1.5rem" }}>Son Hareketler</h3>
              <div className="flex flex-col gap-3">
                 <div className="p-3 glass flex justify-between items-center" style={{ borderRadius: "10px" }}>
                    <div style={{ fontSize: "0.875rem" }}>Temel İSG Eğitimi Katılımı</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>12.04.2024</div>
                 </div>
                 <div className="p-3 glass flex justify-between items-center" style={{ borderRadius: "10px" }}>
                    <div style={{ fontSize: "0.875rem" }}>KKD Zimmet Teslimi</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>10.04.2024</div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

import { Building2, Plus, Trash2, MapPin, ChevronRight, Layers } from "lucide-react";
import Link from "next/link";

export default async function BranchesPage() {
  const session = await auth();
  const user = session?.user as any;

  const branches = await prisma.branch.findMany({
    where: {
      tenantId: user.tenantId,
    },
    include: {
      departments: true,
      _count: {
        select: { employees: true }
      }
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2>Şube ve Departman Yönetimi</h2>
          <p style={{ color: "var(--text-muted)" }}>Şirketinizin organizasyon yapısını düzenleyin.</p>
        </div>
        <Link href="/dashboard/settings/branches/new" className="btn btn-primary flex items-center gap-2">
          <Plus size={20} />
          Yeni Şube Ekle
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {branches.length === 0 ? (
          <div className="glass-card" style={{ padding: "4rem", textAlign: "center" }}>
            <Building2 size={48} style={{ color: "var(--border)", marginBottom: "1rem" }} />
            <p style={{ color: "var(--text-muted)" }}>Henüz tanımlanmış bir şube bulunmuyor.</p>
          </div>
        ) : (
          branches.map((branch) => (
            <div key={branch.id} className="glass-card">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <div style={{ padding: "1rem", background: "rgba(14, 165, 233, 0.1)", borderRadius: "12px", color: "var(--primary)" }}>
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h3 style={{ marginBottom: "0.25rem" }}>{branch.name}</h3>
                    <div className="flex gap-4" style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                      <span className="flex items-center gap-1"><MapPin size={14} /> {branch.city || "Şehir Belirtilmemiş"}</span>
                      <span className="flex items-center gap-1"><Users size={14} style={{ width: "14px" }} /> {branch._count.employees} Çalışan</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                   <button className="btn btn-outline" style={{ padding: "0.5rem" }}>
                      <Plus size={18} />
                   </button>
                   <button className="btn btn-outline" style={{ padding: "0.5rem", color: "var(--danger)" }}>
                      <Trash2 size={18} />
                   </button>
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
                <h4 style={{ fontSize: "1rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Layers size={18} /> Departmanlar
                </h4>
                <div className="grid grid-cols-3 gap-4">
                   {branch.departments.map((dept) => (
                     <div key={dept.id} className="p-3 glass flex justify-between items-center" style={{ borderRadius: "10px" }}>
                        <span style={{ fontSize: "0.875rem" }}>{dept.name}</span>
                        <ChevronRight size={16} style={{ color: "var(--text-muted)" }} />
                     </div>
                   ))}
                   <Link href={`/dashboard/settings/branches/${branch.id}/department/new`} className="p-3 glass flex items-center justify-center gap-2" style={{ borderRadius: "10px", border: "1px dashed var(--border)", color: "var(--text-muted)", cursor: "pointer" }}>
                      <Plus size={16} />
                      <span style={{ fontSize: "0.875rem" }}>Birim Ekle</span>
                   </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Users({ size, style }: { size: number; style?: React.CSSProperties }) {
   return (
     <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
   )
}

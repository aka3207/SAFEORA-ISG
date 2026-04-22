import { auth } from "@/auth";
import prisma from "@/lib/prisma";

import { ArrowLeft, AlertCircle, ShieldAlert, CheckCircle2, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function RiskDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const session = await auth();
  const user = session?.user as any;

  const risk = await prisma.riskAnalysis.findUnique({
    where: {
      id: resolvedParams.id,
      tenantId: user.tenantId,
    },
    include: {
      actions: {
        include: {
          assignee: true
        }
      }
    }
  });

  if (!risk) {
    notFound();
  }

  const getLevelInfo = (score: number) => {
    if (score >= 12) return { label: "YÜKSEK RİSK", color: "#ef4444" };
    if (score >= 5) return { label: "ORTA RİSK", color: "#f59e0b" };
    return { label: "DÜŞÜK RİSK", color: "#10b981" };
  };

  const level = getLevelInfo(risk.riskScore);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/risks" className="btn btn-outline" style={{ padding: "0.5rem" }}>
          <ArrowLeft size={20} />
        </Link>
        <h2 style={{ marginBottom: 0 }}>Risk Analizi Detayları</h2>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 flex flex-col gap-6">
           <div className="glass-card">
              <div className="flex justify-between items-start mb-6">
                 <div>
                    <span className="badge" style={{ background: `${level.color}20`, color: level.color, marginBottom: "0.5rem" }}>{level.label}</span>
                    <h3 style={{ fontSize: "1.8rem" }}>{risk.title}</h3>
                 </div>
                 <div style={{ textAlign: "center", padding: "1rem", background: "rgba(255,255,255,0.05)", borderRadius: "12px" }}>
                    <div style={{ fontSize: "2rem", fontWeight: "bold", color: level.color }}>{risk.riskScore}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Risk Skoru</div>
                 </div>
              </div>
              
              <div className="flex flex-col gap-6">
                 <div>
                    <h4 style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>Tehlike Kaynağı</h4>
                    <p style={{ fontWeight: 500 }}>{risk.hazardSource}</p>
                 </div>
                 <div>
                    <h4 style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>Olası Sonuç / Risk Tanımı</h4>
                    <p>{risk.description}</p>
                 </div>
              </div>
           </div>

           <div className="glass-card">
              <h3 style={{ marginBottom: "1.5rem" }}>Bağlı Aksiyonlar (DÖF)</h3>
              <div className="flex flex-col gap-3">
                 {risk.actions.length === 0 ? (
                    <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "2rem" }}>Bu risk için atanmış aksiyon bulunmamaktadır.</p>
                 ) : (
                    risk.actions.map(action => (
                       <div key={action.id} className="p-4 glass flex justify-between items-center" style={{ borderRadius: "12px" }}>
                          <div className="flex items-center gap-4">
                             <div style={{ color: action.status === "COMPLETED" ? "var(--success)" : "var(--primary)" }}>
                                {action.status === "COMPLETED" ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                             </div>
                             <div>
                                <div style={{ fontWeight: 500 }}>{action.title}</div>
                                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Sorumlu: {action.assignee?.name} • Termin: {new Date(action.deadline).toLocaleDateString("tr-TR")}</div>
                             </div>
                          </div>
                          <Link href="/dashboard/actions" className="btn-ghost" style={{ fontSize: "0.75rem" }}>Detay</Link>
                       </div>
                    ))
                 )}
              </div>
           </div>
        </div>

        <div className="col-span-1 flex flex-col gap-6">
           <div className="glass-card">
              <h4 style={{ marginBottom: "1.5rem" }}>Matris Detayları</h4>
              <div className="flex flex-col gap-6">
                 <div className="flex justify-between items-center">
                    <span style={{ color: "var(--text-muted)" }}>Şiddet (S)</span>
                    <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{risk.severity}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span style={{ color: "var(--text-muted)" }}>Olasılık (P)</span>
                    <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{risk.probability}</span>
                 </div>
                 <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1rem" }}>
                    <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                       L-Tipi 5x5 matris yöntemi ile hesaplanmıştır. (S x P = R)
                    </p>
                 </div>
              </div>
           </div>

           <div className="glass-card" style={{ background: "rgba(239, 68, 68, 0.05)", borderColor: "rgba(239, 68, 68, 0.2)" }}>
              <div className="flex gap-3 mb-4">
                 <ShieldAlert size={20} style={{ color: "var(--danger)" }} />
                 <h4 style={{ color: "var(--danger)" }}>Kritik Uyarı</h4>
              </div>
              <p style={{ fontSize: "0.875rem" }}>
                 Bu risk seviyesi "YÜKSEK" olarak belirlenmiştir. Düzeltici faaliyetler tamamlanana kadar çalışma durdurulmalıdır.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}

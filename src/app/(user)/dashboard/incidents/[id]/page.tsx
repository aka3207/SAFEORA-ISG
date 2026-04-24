import { auth } from "@/auth";
import prisma from "@/lib/prisma";

import { ArrowLeft, Activity, MapPin, Clock, Calendar, AlertCircle, Camera } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function IncidentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const session = await auth();
  const user = session?.user as any;

  const incident = await prisma.incident.findUnique({
    where: {
      id: resolvedParams.id,
      tenantId: user.tenantId,
    },
    include: {
      branch: true,
    }
  });

  if (!incident) {
    notFound();
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/incidents" className="btn btn-outline" style={{ padding: "0.5rem" }}>
          <ArrowLeft size={20} />
        </Link>
        <h2 style={{ marginBottom: 0 }}>Olay Bildirim Detayları</h2>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 flex flex-col gap-6">
           <div className="glass-card">
              <div className="flex items-center gap-3 mb-4">
                 <span className={`badge ${incident.type === "ACCIDENT" ? "badge-danger" : "badge-warning"}`}>
                    {incident.type === "ACCIDENT" ? "İş Kazası" : "Ramak Kala"}
                 </span>
                 <div className="flex items-center gap-2" style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                    <Calendar size={14} />
                    {new Date(incident.date).toLocaleString("tr-TR")}
                 </div>
              </div>
              <h3 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>{incident.title}</h3>
              
              <div className="flex flex-col gap-6">
                 <div>
                    <h4 style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>Olay Açıklaması</h4>
                    <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>{incident.description}</p>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-8">
                    <div className="flex items-center gap-3 p-4 glass" style={{ borderRadius: "12px" }}>
                       <MapPin size={24} style={{ color: "var(--primary)" }} />
                       <div>
                          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Konum</div>
                          <div style={{ fontWeight: 500 }}>{incident.location || "Belirtilmemiş"}</div>
                       </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 glass" style={{ borderRadius: "12px" }}>
                       <Activity size={24} style={{ color: "var(--primary)" }} />
                       <div>
                          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Seviye</div>
                          <div style={{ fontWeight: 500 }}>{incident.severity || "Normal"}</div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="glass-card">
              <h3 style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                 <Camera size={22} /> Olay Yerinden Fotoğraflar
              </h3>
              {incident.photos && JSON.parse(incident.photos).length > 0 ? (
                 <div className="grid grid-cols-3 gap-4">
                    {JSON.parse(incident.photos).map((photo: string, i: number) => (
                       <img key={i} src={photo} alt={`Incident ${i}`} style={{ width: "100%", borderRadius: "12px", border: "1px solid var(--border)" }} />
                    ))}
                 </div>
              ) : (
                 <div style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)", background: "rgba(255,255,255,0.02)", borderRadius: "12px" }}>
                    Bu olay için eklenmiş fotoğraf bulunmamaktadır.
                 </div>
              )}
           </div>
        </div>

        <div className="col-span-1 flex flex-col gap-6">
           <div className="glass-card">
              <h4 style={{ marginBottom: "1rem" }}>Rapor Bilgileri</h4>
              <div className="flex flex-col gap-4" style={{ fontSize: "0.875rem" }}>
                 <div className="flex justify-between">
                    <span style={{ color: "var(--text-muted)" }}>Raporlayan</span>
                    <span style={{ fontWeight: 500 }}>Sistem Kullanıcısı</span>
                 </div>
                 <div className="flex justify-between">
                    <span style={{ color: "var(--text-muted)" }}>Şube</span>
                    <span style={{ fontWeight: 500 }}>{incident.branch?.name}</span>
                 </div>
                 <div className="flex justify-between">
                    <span style={{ color: "var(--text-muted)" }}>Kayıt Tarihi</span>
                    <span>{new Date(incident.createdAt).toLocaleDateString("tr-TR")}</span>
                 </div>
              </div>
           </div>

           <div className="glass-card" style={{ background: "rgba(14, 165, 233, 0.05)" }}>
              <div className="flex gap-3 mb-4">
                 <AlertCircle size={20} style={{ color: "var(--primary)" }} />
                 <h4 style={{ color: "var(--primary)" }}>Resmi Süreç</h4>
              </div>
              <p style={{ fontSize: "0.875rem" }}>
                 İş kazaları yasal olarak 3 iş günü içerisinde SGK'ya bildirilmelidir. Bu kayıt resmi bildirim yerine geçmez.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}

import { 
  Users, 
  ShieldAlert, 
  Calendar, 
  Activity,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

export default function CompanyAdminDashboard() {
  const stats = [
    { name: "Toplam Çalışan", value: "342", icon: Users },
    { name: "Açık Riskler", value: "15", icon: ShieldAlert, color: "var(--danger)" },
    { name: "Yaklaşan Eğitimler", value: "4", icon: Calendar, color: "var(--warning)" },
    { name: "Tamamlanan Aksiyonlar", value: "85%", icon: CheckCircle2, color: "var(--success)" },
  ];

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="glass-card">
            <div className="flex justify-between items-start mb-4">
              <div style={{ padding: "0.5rem", background: "rgba(255,255,255,0.05)", borderRadius: "8px", color: stat.color || "var(--primary)" }}>
                <stat.icon size={20} />
              </div>
            </div>
            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>{stat.name}</p>
            <h4 style={{ fontSize: "1.5rem", fontWeight: "bold", marginTop: "0.25rem" }}>{stat.value}</h4>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="glass-card col-span-2">
          <h3 style={{ marginBottom: "1.5rem" }}>Kritik Olaylar & Riskler</h3>
          <div className="flex flex-col gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-4 p-4" style={{ background: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.1)", borderRadius: "12px" }}>
                <div style={{ color: "var(--danger)" }}>
                  <AlertTriangle size={24} />
                </div>
                <div>
                   <h4 style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>Yüksek Öncelikli Risk: Elektrik Panosu Bakımı</h4>
                   <p style={{ fontSize: "0.875rem" }}>Merkez depo ana elektrik panosunda aşırı ısınma tespit edildi. Acil müdahale bekleniyor.</p>
                   <div className="flex gap-4 mt-2" style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      <span>Sorumlu: Mehmet Uzman</span>
                      <span>Son Tarih: 21.04.2024</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card">
          <h3 style={{ marginBottom: "1.5rem" }}>Aksiyon Takibi</h3>
          <div className="flex flex-col gap-6">
             <div>
                <div className="flex justify-between mb-2">
                   <span style={{ fontSize: "0.875rem" }}>Eğitim Tamamlama</span>
                   <span style={{ fontSize: "0.875rem", color: "var(--primary)" }}>78%</span>
                </div>
                <div style={{ height: "6px", background: "var(--border)", borderRadius: "3px" }}>
                   <div style={{ width: "78%", height: "100%", background: "var(--primary)" }}></div>
                </div>
             </div>
             <div>
                <div className="flex justify-between mb-2">
                   <span style={{ fontSize: "0.875rem" }}>Periyodik Muayeneler</span>
                   <span style={{ fontSize: "0.875rem", color: "var(--success)" }}>92%</span>
                </div>
                <div style={{ height: "6px", background: "var(--border)", borderRadius: "3px" }}>
                   <div style={{ width: "92%", height: "100%", background: "var(--success)" }}></div>
                </div>
             </div>
             <div>
                <div className="flex justify-between mb-2">
                   <span style={{ fontSize: "0.875rem" }}>Ramak Kala Bildirimleri</span>
                   <span style={{ fontSize: "0.875rem", color: "var(--warning)" }}>5 Yeni</span>
                </div>
                <div style={{ height: "6px", background: "var(--border)", borderRadius: "3px" }}>
                   <div style={{ width: "100%", height: "100%", background: "var(--warning)" }}></div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

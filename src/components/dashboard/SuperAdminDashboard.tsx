import { 
  Building2, 
  Users, 
  CreditCard, 
  TrendingUp,
  Briefcase
} from "lucide-react";

export default function SuperAdminDashboard() {
  const stats = [
    { name: "Toplam Şirket", value: "24", icon: Building2, change: "+3", type: "positive" },
    { name: "Aktif Abonelik", value: "18", icon: CreditCard, change: "+2", type: "positive" },
    { name: "Toplam Kullanıcı", value: "1,240", icon: Users, change: "+45", type: "positive" },
    { name: "Aylık Gelir (MRR)", value: "₺142,500", icon: TrendingUp, change: "+12%", type: "positive" },
  ];

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="glass-card flex items-center gap-4">
            <div style={{ padding: "0.75rem", background: "rgba(14, 165, 233, 0.1)", borderRadius: "12px", color: "var(--primary)" }}>
              <stat.icon size={24} />
            </div>
            <div>
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>{stat.name}</p>
              <div className="flex items-baseline gap-2">
                <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{stat.value}</span>
                <span style={{ fontSize: "0.75rem", color: stat.type === "positive" ? "var(--success)" : "var(--danger)" }}>
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="glass-card col-span-2">
          <h3 style={{ marginBottom: "1.5rem" }}>Son Eklenen Şirketler</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", textAlign: "left" }}>
                <th style={{ padding: "1rem 0" }}>Şirket</th>
                <th style={{ padding: "1rem 0" }}>Plan</th>
                <th style={{ padding: "1rem 0" }}>Durum</th>
                <th style={{ padding: "1rem 0" }}>Kayıt</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "1rem 0" }}>
                    <div className="flex items-center gap-2">
                      <div style={{ width: "32px", height: "32px", background: "var(--border)", borderRadius: "6px" }}></div>
                      <span>Örnek Sanayi Ltd. {i}</span>
                    </div>
                  </td>
                  <td style={{ padding: "1rem 0" }}>Kurumsal</td>
                  <td style={{ padding: "1rem 0" }}>
                    <span className="badge badge-success">Aktif</span>
                  </td>
                  <td style={{ padding: "1rem 0", color: "var(--text-muted)" }}>20.04.2024</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="glass-card">
          <h3 style={{ marginBottom: "1.5rem" }}>Sistem Özeti</h3>
          <div className="flex flex-col gap-4">
             <div className="flex justify-between items-center">
                <span>Depolama Kullanımı</span>
                <span>%45</span>
             </div>
             <div style={{ height: "8px", background: "var(--border)", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ width: "45%", height: "100%", background: "var(--primary)" }}></div>
             </div>
             
             <div style={{ marginTop: "1rem" }} className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                   <div style={{ width: "8px", height: "8px", background: "var(--primary)", borderRadius: "50%" }}></div>
                   <span style={{ fontSize: "0.875rem" }}>Bekleyen Demo Talepleri: 12</span>
                </div>
                <div className="flex items-center gap-3">
                   <div style={{ width: "8px", height: "8px", background: "var(--success)", borderRadius: "50%" }}></div>
                   <span style={{ fontSize: "0.875rem" }}>Sistem Durumu: Kararlı</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

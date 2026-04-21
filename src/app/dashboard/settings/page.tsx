import { User, Shield, Building2, Terminal, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function SettingsHubPage() {
  const settingsItems = [
    { name: "Profil Bilgileri", desc: "Kişisel veriler ve avatar yönetimi", icon: User, href: "/dashboard/settings/profile", color: "var(--primary)" },
    { name: "Güvenlik", desc: "Şifre değiştirme ve 2FA", icon: Shield, href: "/dashboard/settings/security", color: "var(--warning)" },
    { name: "Şubeler ve Organizasyon", desc: "Birim ve departman yapısı", icon: Building2, href: "/dashboard/settings/branches", color: "var(--success)" },
    { name: "Sistem Kayıtları", desc: "Audit log ve hareket dökümü", icon: Terminal, href: "/dashboard/settings/logs", color: "var(--primary)" },
  ];

  return (
    <div className="animate-fade-in" style={{ maxWidth: "1000px" }}>
      <div className="mb-8">
        <h2>Ayarlar & Yönetim</h2>
        <p style={{ color: "var(--text-muted)" }}>Hesap ve platform tercihlerini tek bir merkezden yönetin.</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {settingsItems.map((item) => (
          <Link key={item.href} href={item.href} className="glass-card flex items-center justify-between p-6 transition-all hover:scale-[1.02]">
            <div className="flex items-center gap-6">
               <div style={{ padding: "1rem", background: `${item.color}15`, borderRadius: "14px", color: item.color }}>
                  <item.icon size={28} />
               </div>
               <div>
                  <h3 style={{ fontSize: "1.2rem", marginBottom: "0.25rem" }}>{item.name}</h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>{item.desc}</p>
               </div>
            </div>
            <ChevronRight size={20} style={{ color: "var(--text-muted)" }} />
          </Link>
        ))}
      </div>

      <div className="glass-card mt-8" style={{ borderLeft: "4px solid var(--primary)" }}>
         <h4 style={{ marginBottom: "0.5rem" }}>Yardım Gerekiyor mu?</h4>
         <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
            Platform kullanımı ile ilgili sorularınız için dokümantasyonu inceleyebilir veya destek ekibimizle iletişime geçebilirsiniz.
         </p>
         <Link href="/contact" className="btn btn-outline" style={{ fontSize: "0.875rem" }}>Destek Talebi Oluştur</Link>
      </div>
    </div>
  );
}

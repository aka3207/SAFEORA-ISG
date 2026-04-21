import { Shield, Target, Users, Award, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const stats = [
    { label: "Kullanıcı", value: "10K+" },
    { label: "Şirket", value: "500+" },
    { label: "Önlenen Olay", value: "100K+" },
    { label: "Güven Analizi", value: "%99.9" },
  ];

  return (
    <main className="animate-fade-in" style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div className="flex flex-col items-center text-center mb-16">
        <span className="badge badge-primary" style={{ marginBottom: "1rem" }}>Hakkımızda</span>
        <h1 style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }}>İş Sağlığı ve Güvenliğinde Dijital Dönüşüm</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.2rem", maxWidth: "800px" }}>
          SAFEORA, modern iş dünyasının karmaşık İSG süreçlerini tek bir merkezden, kağıtsız ve hatasız yönetmek için tasarlandı.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-12 mb-20 items-center">
        <div>
           <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Vizyonumuz</h2>
           <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", marginBottom: "2rem" }}>
              Dünyanın her yerindeki çalışanların evlerine her gün sağlıklı ve güvenli bir şekilde dönmesini sağlamak için teknolojinin sınırlarını zorluyoruz. 
              Geleneksel yöntemlerin ötesine geçerek, proaktif risk yönetimi ve yapay zeka destekli analizlerle iş kazalarını sıfıra indirmeyi hedefliyoruz.
           </p>
           <div className="flex flex-col gap-4">
              {[
                "Modern ve kullanıcı dostu arayüz",
                "Gerçek zamanlı veri analitiği",
                "Esnek ve ölçeklenebilir SaaS mimarisi",
                "Yasal mevzuata %100 uyumluluk"
              ].map(text => (
                <div key={text} className="flex items-center gap-3">
                   <CheckCircle2 size={20} style={{ color: "var(--primary)" }} />
                   <span style={{ fontWeight: 500 }}>{text}</span>
                </div>
              ))}
           </div>
        </div>
        <div className="glass-card flex items-center justify-center py-20" style={{ background: "linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, transparent 100%)" }}>
           <Shield size={120} style={{ color: "var(--primary)", opacity: 0.8 }} />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-8 mb-20">
         {stats.map(s => (
           <div key={s.label} className="glass-card text-center py-10">
              <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "var(--primary)", marginBottom: "0.5rem" }}>{s.value}</div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>{s.label}</div>
           </div>
         ))}
      </div>

      <div className="glass-card text-center py-20" style={{ border: "1px dashed var(--border)" }}>
         <h2 style={{ marginBottom: "1.5rem" }}>Geleceği Birlikte İnşa Edelim</h2>
         <p style={{ color: "var(--text-muted)", marginBottom: "2.5rem", maxWidth: "600px", margin: "0 auto 2.5rem" }}>
            SAFEORA ile iş yerinizde güvenliğin bir seçenek değil, bir standart olmasını sağlayın.
         </p>
         <div className="flex justify-center gap-4">
            <Link href="/contact" className="btn btn-primary" style={{ padding: "1rem 2rem" }}>Demo Başlat</Link>
            <Link href="/" className="btn btn-outline" style={{ padding: "1rem 2rem" }}>Ana Sayfaya Dön</Link>
         </div>
      </div>
    </main>
  );
}
function UsersIcon({ size, style }: { size: number; style?: React.CSSProperties }) {
   return (
     <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
   )
}

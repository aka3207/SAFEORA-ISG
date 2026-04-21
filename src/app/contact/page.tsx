import { Mail, Phone, MapPin, Send } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="animate-fade-in" style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div className="flex flex-col items-center text-center mb-16">
        <span className="badge badge-primary" style={{ marginBottom: "1rem" }}>İletişim</span>
        <h1 style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }}>Bizimle İletişime Geçin</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.2rem", maxWidth: "700px" }}>
          SAFEORA platformu hakkında sorularınız mı var? Ekibimiz size yardımcı olmaktan mutluluk duyacaktır.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-12">
        <div className="flex flex-col gap-8">
           <div className="glass-card">
              <h3 style={{ marginBottom: "2rem" }}>Mesaj Gönderin</h3>
              <form className="flex flex-col gap-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                       <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>Ad Soyad</label>
                       <input type="text" className="input" placeholder="Ahmet Yılmaz" required />
                    </div>
                    <div className="flex flex-col gap-2">
                       <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>Şirket</label>
                       <input type="text" className="input" placeholder="Lojistik A.Ş." />
                    </div>
                 </div>
                 <div className="flex flex-col gap-2">
                    <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>E-posta</label>
                    <input type="email" className="input" placeholder="ahmet@sirket.com" required />
                 </div>
                 <div className="flex flex-col gap-2">
                    <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>Mesajınız</label>
                    <textarea className="input" placeholder="Size nasıl yardımcı olabiliriz?" style={{ height: "150px" }} required></textarea>
                 </div>
                 <button type="submit" className="btn btn-primary flex items-center justify-center gap-2" style={{ padding: "1rem" }}>
                    <Send size={20} />
                    Gönder
                 </button>
              </form>
           </div>
        </div>

        <div className="flex flex-col gap-6">
           <div className="glass-card">
              <h3 style={{ marginBottom: "1.5rem" }}>İlitişim Bilgileri</h3>
              <div className="flex flex-col gap-6">
                 <div className="flex gap-4">
                    <div style={{ color: "var(--primary)" }}><Mail size={24} /></div>
                    <div>
                       <div style={{ fontWeight: 600 }}>E-posta</div>
                       <div style={{ color: "var(--text-muted)" }}>destek@safeora.com</div>
                    </div>
                 </div>
                 <button className="btn btn-outline" style={{ display: "none" }}>Click</button> {/* Dummy for spacing check */}
                 <div className="flex gap-4">
                    <div style={{ color: "var(--primary)" }}><Phone size={24} /></div>
                    <div>
                       <div style={{ fontWeight: 600 }}>Telefon</div>
                       <div style={{ color: "var(--text-muted)" }}>+90 (212) 555 0123</div>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div style={{ color: "var(--primary)" }}><MapPin size={24} /></div>
                    <div>
                       <div style={{ fontWeight: 600 }}>Adres</div>
                       <div style={{ color: "var(--text-muted)" }}>Maslak Veri Merkezi, Kat: 12, İstanbul</div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="glass-card" style={{ background: "rgba(14, 165, 233, 0.05)", border: "1px dashed var(--primary)" }}>
              <h4 style={{ marginBottom: "0.5rem" }}>Satış Ekibimize Ulaşın</h4>
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                 Kurumsal lisanslama ve özel entegrasyonlar için doğrudan satış temsilcimizle görüşün.
              </p>
              <button className="btn btn-ghost" style={{ padding: "0.5rem 0", color: "var(--primary)", marginTop: "1rem" }}>Randevu Al →</button>
           </div>
        </div>
      </div>
      
      <div className="mt-16 text-center">
         <Link href="/" className="btn-ghost" style={{ fontSize: "0.875rem" }}>Ana Sayfaya Dön</Link>
      </div>
    </main>
  );
}

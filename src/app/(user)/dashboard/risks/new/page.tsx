"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import Link from "next/link";
import { createRisk } from "@/app/actions/risks";

export default function NewRiskPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [severity, setSeverity] = useState(1);
  const [probability, setProbability] = useState(1);
  const [title, setTitle] = useState("");
  const [hazardSource, setHazardSource] = useState("");
  const [description, setDescription] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [deadline, setDeadline] = useState("");

  const score = severity * probability;

  const getLevelInfo = (s: number) => {
    if (s >= 12) return { label: "YÜKSEK RİSK", color: "#ef4444", desc: "Kabul edilemez risk. Acil önlem alınmalı." };
    if (s >= 5) return { label: "ORTA RİSK", color: "#f59e0b", desc: "Dikkatle izlenmesi gereken risk. Planlı önlem gerekli." };
    return { label: "DÜŞÜK RİSK", color: "#10b981", desc: "Kabul edilebilir risk. Mevcut kontroller yeterli." };
  };

  const level = getLevelInfo(score);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createRisk({
        title,
        description,
        hazardSource,
        severity,
        probability,
        assigneeId,
        deadline,
      });
      router.push("/dashboard/risks");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Risk kaydedilirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard/risks" className="btn btn-outline" style={{ padding: "0.5rem" }}>
          <ArrowLeft size={20} />
        </Link>
        <h2 style={{ marginBottom: 0 }}>Yeni Risk Değerlendirmesi</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6">
        <div className="col-span-2 flex flex-col gap-6">
          <div className="glass-card">
            <h3 style={{ marginBottom: "1.5rem" }}>Temel Bilgiler</h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>Risk Tanımı / Başlığı</label>
                <input type="text" className="input" placeholder="Örn: Forklift Devrilme Riski" required value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="flex flex-col gap-2">
                <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>Tehlike Kaynağı</label>
                <input type="text" className="input" placeholder="Örn: Zemin bozukluğu, aşırı hız" required value={hazardSource} onChange={(e) => setHazardSource(e.target.value)} />
              </div>
              <div className="flex flex-col gap-2">
                <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>Olası Sonuç</label>
                <textarea className="input" placeholder="Örn: Yaralanma, maddi hasar" style={{ height: "80px" }} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              </div>
            </div>
          </div>

          <div className="glass-card">
            <h3 style={{ marginBottom: "1.5rem" }}>L-Tipi Risk Matrisi (5x5)</h3>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label style={{ fontSize: "0.875rem", fontWeight: 500, display: "block", marginBottom: "1rem" }}>Olasılık (P)</label>
                <div className="flex flex-col gap-2">
                   {[1, 2, 3, 4, 5].map(val => (
                     <button 
                       type="button"
                       key={val}
                       onClick={() => setProbability(val)}
                       className="btn"
                       style={{ 
                         background: probability === val ? "var(--primary)" : "var(--input-bg)",
                         color: probability === val ? "#ffffff" : "var(--foreground)",
                         justifyContent: "flex-start",
                         textAlign: "left",
                         fontSize: "0.875rem"
                       }}
                     >
                       {val} - {["Çok Küçük", "Küçük", "Orta", "Yüksek", "Çok Yüksek"][val-1]}
                     </button>
                   ))}
                </div>
              </div>
              
              <div>
                <label style={{ fontSize: "0.875rem", fontWeight: 500, display: "block", marginBottom: "1rem" }}>Şiddet (S)</label>
                <div className="flex flex-col gap-2">
                   {[1, 2, 3, 4, 5].map(val => (
                     <button 
                       type="button"
                       key={val}
                       onClick={() => setSeverity(val)}
                       className="btn"
                       style={{ 
                         background: severity === val ? "var(--primary)" : "var(--input-bg)",
                         color: severity === val ? "#ffffff" : "var(--foreground)",
                         justifyContent: "flex-start",
                         textAlign: "left",
                         fontSize: "0.875rem"
                       }}
                     >
                       {val} - {["Hafif", "Düşük", "Orta", "Ciddi", "Çok Ciddi"][val-1]}
                     </button>
                   ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass-card" style={{ textAlign: "center", borderColor: level.color }}>
             <h3 style={{ marginBottom: "1rem" }}>Risk Skoru</h3>
             <div style={{ fontSize: "4rem", fontWeight: "bold", color: level.color }}>{score}</div>
             <div className="badge" style={{ background: `${level.color}20`, color: level.color, fontSize: "1rem", padding: "0.5rem 1rem" }}>
                {level.label}
             </div>
             <p style={{ marginTop: "1rem", fontSize: "0.875rem" }}>{level.desc}</p>
             
             <div style={{ marginTop: "2rem" }}>
                <button type="submit" className="btn btn-primary w-full flex items-center justify-center gap-2" disabled={loading}>
                  <Save size={20} />
                  {loading ? "Kaydediliyor..." : "Risk Kaydını Onayla"}
                </button>
             </div>
          </div>
        </div>
      </form>
    </div>
  );
}

"use client";

import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { completeAction } from "@/app/actions/actions";

interface CompleteActionButtonProps {
  id: string;
}

export default function CompleteActionButton({ id }: CompleteActionButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleComplete = async () => {
    if (confirm("Bu aksiyonu tamamlandı olarak işaretlemek istediğinize emin misiniz?")) {
      setLoading(true);
      try {
        await completeAction(id);
        router.refresh();
      } catch (err) {
        console.error(err);
        alert("İşlem sırasında bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <button 
      onClick={handleComplete}
      disabled={loading}
      className={`btn btn-outline ${loading ? "opacity-50" : ""}`} 
      style={{ border: "1px solid var(--success)", color: "var(--success)" }}
    >
      <CheckCircle2 size={18} style={{ marginRight: "0.5rem" }} />
      Kapat
    </button>
  );
}

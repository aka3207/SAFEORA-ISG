"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  id: string;
  onDelete: (id: string) => Promise<void>;
  entityName?: string;
}

export default function DeleteButton({ id, onDelete, entityName = "kaydı" }: DeleteButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleConfirm = async () => {
    if (confirm(`Bu ${entityName} silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`)) {
      setLoading(true);
      try {
        await onDelete(id);
        router.refresh();
      } catch (err) {
        console.error(err);
        alert("Silme işlemi sırasında bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <button 
      onClick={handleConfirm}
      disabled={loading}
      className={`btn-ghost ${loading ? "opacity-50" : ""}`} 
      style={{ padding: "0.5rem", color: "var(--danger)" }}
      title="Sil"
    >
      <Trash2 size={18} />
    </button>
  );
}

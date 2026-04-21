"use client";

import { Download } from "lucide-react";
import { exportToCSV } from "@/lib/export";

interface ExportButtonProps {
  data: any[];
  filename: string;
}

export default function ExportButton({ data, filename }: ExportButtonProps) {
  return (
    <button 
      onClick={() => exportToCSV(data, filename)}
      className="btn btn-outline flex items-center gap-2"
    >
      <Download size={18} />
      CSV Dışa Aktar
    </button>
  );
}

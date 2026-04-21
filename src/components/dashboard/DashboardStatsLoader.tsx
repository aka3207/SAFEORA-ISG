"use client";

import dynamic from "next/dynamic";

// Dynamic import defined inside a Client Component to be App Router compliant
const UnifiedDashboardContent = dynamic(() => import("./UnifiedDashboard"), { 
  ssr: false,
  loading: () => <div className="w-full h-96 bg-slate-50 animate-pulse rounded-3xl" />
});

export default function DashboardStatsLoader() {
  return <UnifiedDashboardContent />;
}

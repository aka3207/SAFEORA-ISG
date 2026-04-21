"use client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";

const data = [
  { name: "Oca", kazalar: 2, ramak: 12 },
  { name: "Şub", kazalar: 1, ramak: 8 },
  { name: "Mar", kazalar: 3, ramak: 15 },
  { name: "Nis", kazalar: 1, ramak: 20 },
];

const pieData = [
  { name: "Düşük", value: 45, color: "#10b981" },
  { name: "Orta", value: 30, color: "#f59e0b" },
  { name: "Yüksek", value: 25, color: "#ef4444" },
];

export default function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-2 gap-6 animate-fade-in">
      <div className="glass-card" style={{ height: "400px" }}>
        <h4 style={{ marginBottom: "1.5rem" }}>Olay Dağılımı (Aylık)</h4>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="var(--text-muted)" />
            <YAxis stroke="var(--text-muted)" />
            <Tooltip 
               contentStyle={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: "8px" }}
            />
            <Bar dataKey="kazalar" fill="var(--danger)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="ramak" fill="var(--primary)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-card" style={{ height: "400px" }}>
        <h4 style={{ marginBottom: "1.5rem" }}>Risk Seviyesi Dağılımı</h4>
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
               contentStyle={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: "8px" }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-4" style={{ fontSize: "0.75rem", marginTop: "-1rem" }}>
           {pieData.map(d => (
             <div key={d.name} className="flex items-center gap-1">
                <div style={{ width: "8px", height: "8px", background: d.color, borderRadius: "50%" }}></div>
                <span>{d.name}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}

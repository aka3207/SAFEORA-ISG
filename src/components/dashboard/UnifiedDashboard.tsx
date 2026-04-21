"use client";

import { 
  Users, 
  ShieldAlert, 
  Calendar, 
  ClipboardList, 
  TrendingUp, 
  Clock, 
  MapPin,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { useState, useEffect } from "react";

const data = [
  { name: 'Oca', kazalar: 4, riskler: 12 },
  { name: 'Şub', kazalar: 3, riskler: 18 },
  { name: 'Mar', kazalar: 2, riskler: 15 },
  { name: 'Nis', kazalar: 6, riskler: 25 },
  { name: 'May', kazalar: 1, riskler: 10 },
  { name: 'Haz', kazalar: 3, riskler: 8 },
];

export default function UnifiedDashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Welcome Section */}
      <div>
        <h3 className="text-lg font-bold text-slate-800">Operasyonel Durum</h3>
        <p className="text-sm text-slate-500">Bugün için hazırlanan gerçek zamanlı veriler.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Toplam Çalışan" 
          value="1,248" 
          change="+12%" 
          isUp={true} 
          icon={Users} 
          color="blue" 
        />
        <StatCard 
          title="Açık Risk Analizi" 
          value="42" 
          change="-4" 
          isUp={false} 
          icon={ShieldAlert} 
          color="amber" 
        />
        <StatCard 
          title="Yaklaşan Eğitimler" 
          value="8" 
          change="+2" 
          isUp={true} 
          icon={Calendar} 
          color="emerald" 
        />
        <StatCard 
          title="Bekleyen Aksiyonlar" 
          value="15" 
          change="Sabit" 
          isUp={null} 
          icon={ClipboardList} 
          color="indigo" 
        />
      </div>

      {/* Main Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Analytics Chart */}
        <div className="lg:col-span-2 safe-card p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="font-bold text-slate-900 text-lg">Risk & Olay Trendi</h4>
              <p className="text-xs text-slate-500 font-medium">Son 6 ayın karşılaştırmalı analizi</p>
            </div>
            <select className="bg-slate-50 border border-slate-200 text-xs font-bold rounded-lg px-3 py-1.5 focus:outline-none">
              <option>Son 6 Ay</option>
              <option>Son 1 Yıl</option>
            </select>
          </div>
          <div className="h-[300px] w-full min-w-0">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}}
                  />
                  <Tooltip 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="riskler" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorRisk)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full bg-slate-50 animate-pulse rounded-2xl flex items-center justify-center">
                 <span className="text-xs text-slate-400 font-bold uppercase tracking-widest text-center">Analiz Yükleniyor...</span>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="safe-card p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-slate-900 text-lg">Son Aktiviteler</h4>
            <Clock className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar flex-1 max-h-[350px]">
             <ActivityItem 
                title="Yeni Kaza Raporu" 
                desc="Gebze Fabrika - Üretim Hattı" 
                time="15 dk önce" 
                type="danger" 
             />
             <ActivityItem 
                title="Eğitim Tamamlandı" 
                desc="Temel İSG Eğitimi - 12 Katılımcı" 
                time="2 saat önce" 
                type="success" 
             />
             <ActivityItem 
                title="Risk Analizi Güncellendi" 
                desc="Yüksekte Çalışma Protokolü" 
                time="4 saat önce" 
                type="info" 
             />
             <ActivityItem 
                title="Yeni Aksiyon Atandı" 
                desc="Acil Çıkış Kapıları Kontrolü" 
                time="Dün" 
                type="warning" 
             />
             <ActivityItem 
                title="Sistem Bakımı" 
                desc="Veritabanı optimizasyonu tamamlandı" 
                time="Bugün" 
                type="info" 
             />
          </div>
          <button className="mt-6 w-full py-2.5 bg-slate-50 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-100 transition-all">
             Tümünü Görüntüle
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, isUp, icon: Icon, color }: any) {
  const colors: any = {
    blue: "text-blue-600 bg-blue-50 border-blue-100",
    amber: "text-amber-600 bg-amber-50 border-amber-100",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
    indigo: "text-indigo-600 bg-indigo-50 border-indigo-100",
  };

  return (
    <div className="safe-card p-6 flex flex-col justify-between group hover:border-slate-300">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-xl border ${colors[color]} group-hover:scale-110 transition-transform`}>
          <Icon className="w-5 h-5" />
        </div>
        {isUp !== null && (
          <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${isUp ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"}`}>
            {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {change}
          </div>
        )}
      </div>
      <div>
        <p className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
      </div>
    </div>
  );
}

function ActivityItem({ title, desc, time, type }: any) {
  const colors: any = {
    success: "bg-emerald-500",
    danger: "bg-rose-500",
    warning: "bg-amber-500",
    info: "bg-blue-500",
  };

  return (
    <div className="flex gap-4 group">
      <div className="relative">
        <div className={`w-2.5 h-2.5 rounded-full mt-1.5 ${colors[type]} ring-4 ring-white relative z-10`} />
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-px h-full bg-slate-100 group-last:hidden" />
      </div>
      <div>
        <h5 className="text-sm font-bold text-slate-900 mb-0.5 leading-none">{title}</h5>
        <p className="text-xs text-slate-500 mb-1">{desc}</p>
        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded uppercase tracking-tighter">
          {time}
        </span>
      </div>
    </div>
  );
}

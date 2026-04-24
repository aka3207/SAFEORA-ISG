"use client";

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Jan', revenue: 120000 },
  { name: 'Feb', revenue: 135000 },
  { name: 'Mar', revenue: 132000 },
  { name: 'Apr', revenue: 142500 },
];

export function RevenueChart() {
  return (
    <div style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
          <XAxis 
             dataKey="name" 
             axisLine={false} 
             tickLine={false} 
             tick={{ fill: '#64748b', fontSize: 12 }} 
             dy={10}
          />
          <YAxis 
             axisLine={false} 
             tickLine={false} 
             tick={{ fill: '#64748b', fontSize: 12 }}
             tickFormatter={(val) => `₺${val/1000}k`}
          />
          <Tooltip 
             contentStyle={{ 
                backgroundColor: '#0f172a', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: '#fff'
             }} 
          />
          <Area 
             type="monotone" 
             dataKey="revenue" 
             stroke="#3b82f6" 
             strokeWidth={3}
             fillOpacity={1} 
             fill="url(#colorRev)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

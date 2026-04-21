'use client';

import { Shield, FileText, Smartphone, Users, HeartPulse, Bell, BarChart3, Lock } from 'lucide-react';
import { Language, translations } from '@/lib/translations';

const iconMap = [
  Shield,
  FileText,
  Smartphone,
  Users,
  HeartPulse,
  Bell
];

export default function Features({ lang }: { lang: Language }) {
  const t = translations[lang].features;

  return (
    <section id="features" className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div className="badge">{lang === 'en' ? 'Core Features' : 'Temel Özellikler'}</div>
          <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{t.title}</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto' }}>{t.subtitle}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {t.items.map((item, index) => {
            const Icon = iconMap[index];
            return (
              <div key={index} className="glass-card glow-effect" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'var(--card-bg)' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  background: 'var(--accent-glow)', 
                  borderRadius: '16px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: 'var(--accent)', 
                  border: '1px solid var(--card-border)' 
                }}>
                  <Icon size={28} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--foreground)' }}>{item.title}</h3>
                  <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

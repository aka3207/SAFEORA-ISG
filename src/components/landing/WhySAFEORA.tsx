'use client';

import { Activity, Clock, Globe } from 'lucide-react';
import { Language, translations } from '@/lib/translations';

export default function WhySAFEORA({ lang }: { lang: Language }) {
  const t = translations[lang].why;
  const icons = [Activity, Clock, Globe];

  return (
    <section className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '3rem', color: 'var(--foreground)' }}>{t.title}</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {t.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <div key={index} className="glass-card glow-effect" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', background: 'var(--card-bg)' }}>
                <div style={{ width: '80px', height: '80px', background: 'var(--accent-glow)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', border: '1px solid var(--card-border)' }}>
                  <Icon size={32} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--foreground)' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-muted)' }}>{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

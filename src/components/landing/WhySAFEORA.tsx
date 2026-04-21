'use client';

import { Activity, Clock, Globe } from 'lucide-react';
import { Language, translations } from '@/lib/translations';

export default function WhySAFEORA({ lang }: { lang: Language }) {
  const t = translations[lang].why;
  const icons = [Activity, Clock, Globe];

  return (
    <section className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '3rem' }}>{t.title}</h2>
        </div>
        <div className="grid grid-cols-3">
          {t.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <div key={index} className="glass-card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ width: '80px', height: '80px', background: 'var(--primary-glow)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                  <Icon size={40} />
                </div>
                <h3 style={{ fontSize: '1.5rem' }}>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

'use client';

import { Quote } from 'lucide-react';
import { Language, translations } from '@/lib/translations';

export default function Testimonials({ lang }: { lang: Language }) {
  const t = translations[lang].testimonials;

  return (
    <section className="section-padding" style={{ background: 'var(--background)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div className="badge">{lang === 'en' ? 'Testimonials' : 'Müşteri Yorumları'}</div>
          <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{t.title}</h2>
        </div>

        <div className="grid grid-cols-3">
          {t.items.map((item, index) => (
            <div key={index} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '2rem' }}>
              <div style={{ color: 'var(--primary)', opacity: 0.2 }}>
                <Quote size={48} />
              </div>
              
              <p style={{ fontSize: '1.1rem', color: 'var(--foreground)', fontStyle: 'italic', lineHeight: '1.7' }}>
                "{item.quote}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: 'auto' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                  {item.author[0]}
                </div>
                <div>
                  <div style={{ fontWeight: '700', color: 'var(--foreground)' }}>{item.author}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

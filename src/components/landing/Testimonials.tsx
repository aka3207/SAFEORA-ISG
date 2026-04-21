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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {t.items.map((item, index) => (
            <div key={index} className="glass-card glow-effect" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', background: 'var(--card-bg)' }}>
              <div style={{ color: 'var(--accent)', opacity: 0.15 }}>
                <Quote size={40} />
              </div>
              
              <p style={{ fontSize: '1.05rem', color: 'var(--foreground)', fontStyle: 'italic', lineHeight: '1.7' }}>
                "{item.quote}"
              </p>
 
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: 'auto' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '50%', 
                  background: 'linear-gradient(135deg, var(--accent), #10b981)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: 'white', 
                  fontWeight: '800',
                  fontSize: '1.1rem'
                }}>
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

'use client';

import { ArrowRight } from 'lucide-react';
import { Language, translations } from '@/lib/translations';

export default function CTASection({ lang }: { lang: Language }) {
  const t = translations[lang].cta;

  return (
    <section className="section-padding">
      <div className="container">
        <div className="glass-card" style={{ 
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)', 
          padding: '5rem', 
          borderRadius: 'var(--radius-lg)',
          textAlign: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative glow */}
          <div style={{ position: 'absolute', top: '-50%', left: '-20%', width: '100%', height: '200%', background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 60%)', filter: 'blur(50px)' }} />
          
          <h2 style={{ fontSize: '3.5rem', marginBottom: '2rem', position: 'relative', color: 'white' }}>{t.headline}</h2>
          <div style={{ position: 'relative' }}>
            <a href="/contact" className="btn" style={{ 
              background: 'white', 
              color: 'var(--primary)', 
              fontSize: '1.25rem', 
              padding: '1.25rem 3rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              {t.button}
              <ArrowRight size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

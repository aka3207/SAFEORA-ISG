'use client';

import { Check } from 'lucide-react';
import { Language, translations } from '@/lib/translations';

export default function Pricing({ lang }: { lang: Language }) {
  const t = translations[lang].pricing;

  const plans = [
    {
      ...t.starter,
      featured: false,
      features: lang === 'en' ? ['Up to 50 employees', 'Core safety modules', 'Basic reporting', 'Email support'] : ['50 çalışana kadar', 'Temel İSG modülleri', 'Temel raporlama', 'E-posta desteği']
    },
    {
      ...t.growth,
      featured: true,
      features: lang === 'en' ? ['Up to 250 employees', 'All safety modules', 'Advanced analytics', 'Priority support'] : ['250 çalışana kadar', 'Tüm İSG modülleri', 'Gelişmiş analitik', 'Öncelikli destek']
    },
    {
      ...t.enterprise,
      featured: false,
      features: lang === 'en' ? ['Unlimited employees', 'Custom integrations', 'Dedicated manager', '24/7 Phone support'] : ['Sınırsız çalışan', 'Özel entegrasyonlar', 'Özel müşteri yöneticisi', '7/24 telefon desteği']
    }
  ];

  return (
    <section id="pricing" className="section-padding" style={{ background: 'var(--input-bg)', position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div className="badge">{lang === 'en' ? 'Pricing Plans' : 'Fiyatlandırma'}</div>
          <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{t.title}</h2>
          <p style={{ marginBottom: '2.5rem' }}>{lang === 'en' ? 'Choose the plan that fits your business size.' : 'Şirketinizin büyüklüğüne en uygun planı seçin.'}</p>
          
          <div className="glass-card glow-effect" style={{ 
            maxWidth: '800px', 
            margin: '0 auto 4rem', 
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(20, 184, 166, 0.1) 100%)',
            padding: '1.5rem 2.5rem',
            borderRadius: '9999px',
            border: '2px solid var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem'
          }}>
            <div style={{ background: 'var(--primary)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '900', letterSpacing: '0.05em' }}>
              {lang === 'en' ? 'LIMITED OFFER' : 'SINIRLI TEKLİF'}
            </div>
            <span style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--foreground)' }}>
              {t.foundingMember}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`glass-card ${plan.featured ? 'glow-effect' : ''}`} 
              style={{ 
                position: 'relative', 
                background: plan.featured ? 'var(--background)' : 'var(--card-bg)',
                borderColor: plan.featured ? 'var(--primary)' : 'var(--card-border)',
                transform: plan.featured ? 'scale(1.05)' : 'none',
                zIndex: plan.featured ? 1 : 0
              }}
            >
              {plan.featured && (
                <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', color: 'white', padding: '0.25rem 1rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '800' }}>
                  {lang === 'en' ? 'MOST POPULAR' : 'EN POPÜLER'}
                </div>
              )}
              
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{plan.name}</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '2rem' }}>{plan.desc}</p>
              
              <div style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '2.5rem', display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                {plan.price}
                {plan.price !== 'Custom' && plan.price !== 'Teklif Alın' && (
                  <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/mo</span>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                {plan.features.map((feature, fIndex) => (
                  <div key={fIndex} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ color: 'var(--success)' }}>
                      <Check size={18} />
                    </div>
                    <span style={{ fontSize: '0.95rem', color: 'var(--foreground)' }}>{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`btn ${plan.featured ? 'btn-primary' : 'btn-outline'}`} style={{ width: '100%', borderRadius: '12px' }}>
                {lang === 'en' ? 'Get Started' : 'Başlayın'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

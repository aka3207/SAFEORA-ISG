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
    <section id="pricing" className="section-padding" style={{ position: 'relative' }}>
      <div className="soft-lighting" style={{ top: '20%', opacity: 0.5 }} />
      
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div className="badge">{lang === 'en' ? 'Pricing Plans' : 'Fiyatlandırma'}</div>
          <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', color: 'var(--foreground)' }}>{t.title}</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 3rem', color: 'var(--text-muted)' }}>
            {lang === 'en' ? 'Choose the plan that fits your business size.' : 'Şirketinizin büyüklüğüne en uygun planı seçin.'}
          </p>
          
          <div className="glass-card glow-effect" style={{ 
            maxWidth: '750px', 
            margin: '0 auto', 
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
            padding: '1.25rem 2rem',
            borderRadius: '9999px',
            border: '1px solid var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem',
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.15)'
          }}>
            <div style={{ 
              background: 'var(--accent)', 
              color: 'white', 
              padding: '0.35rem 0.85rem', 
              borderRadius: '9999px', 
              fontSize: '0.7rem', 
              fontWeight: '900', 
              letterSpacing: '0.05em',
              boxShadow: '0 4px 10px rgba(59, 130, 246, 0.3)'
            }}>
              {lang === 'en' ? 'LIMITED OFFER' : 'SINIRLI TEKLİF'}
            </div>
            <span style={{ fontWeight: '600', fontSize: '1rem', color: 'var(--foreground)', letterSpacing: '-0.01em' }}>
              {t.foundingMember}
            </span>
          </div>
        </div>
 
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`glass-card ${plan.featured ? 'glow-effect' : ''}`} 
              style={{ 
                position: 'relative', 
                background: plan.featured ? 'var(--card-bg)' : 'rgba(15, 23, 42, 0.3)',
                borderColor: plan.featured ? 'var(--accent)' : 'var(--card-border)',
                transform: plan.featured ? 'scale(1.02)' : 'none',
                zIndex: plan.featured ? 1 : 0,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                padding: '2.5rem'
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

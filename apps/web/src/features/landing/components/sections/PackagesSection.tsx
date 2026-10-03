import { useState } from 'react';
import { ArrowButton } from '../ArrowButton';
import { Reveal } from '../../../../shared/ui/Reveal';

interface PackagesSectionProps {
  onSelectPlan?: (planName: string) => void;
}

export function PackagesSection({ onSelectPlan }: PackagesSectionProps) {
  const [mobileTierIdx, setMobileTierIdx] = useState(1);
  const tiers = [
    {
      id: 'essential',
      name: 'THE ESSENTIAL',
      duration: '30 DAYS SUBSCRIPTION',
      price: '2.800.000',
      unit: 'VNĐ / THÁNG',
      description: 'Ideal for focused independent practitioners seeking world-class architectural facilities.',
      perks: [
        'Full access to Olympic Strength & Cardio Sanctuary',
        'Hydrotherapy lap pool & Finnish sauna access',
        '2 Group Class credits per week (Yoga/Spinning)',
        'Dynamic QR Pass on mobile client',
      ],
      featured: false,
    },
    {
      id: 'sanctuary',
      name: 'THE SANCTUARY',
      duration: '90 DAYS SUBSCRIPTION',
      price: '7.500.000',
      unit: 'VNĐ / QUÝ',
      description: 'Our most comprehensive residency for holistic conditioning and athletic restoration.',
      perks: [
        'Unlimited access to all studios & disciplines',
        'Reformer Pilates & Boxing Ring access',
        'Monthly InBody 770 AI Biometric Calibration',
        '4 Private 1-on-1 Master Coach sessions',
        'Complimentary laundry & artisanal locker valet',
      ],
      featured: true,
    },
    {
      id: 'sovereign',
      name: 'THE SOVEREIGN',
      duration: '365 DAYS ANNUAL RESIDENCY',
      price: '26.000.000',
      unit: 'VNĐ / NĂM',
      description: 'The pinnacle of private athletic refinement with dedicated concierge and unlimited guest privileges.',
      perks: [
        'Unrestricted VIP access across all facilities 24/7',
        'Dedicated Personal Performance Coach & Dietitian',
        'Unlimited Cryotherapy & Contrast Hydrotherapy circuits',
        'Priority studio waitlist allocation',
        'Executive private dressing suite with organic amenities',
      ],
      featured: false,
    },
  ];

  const handleSelect = (planName: string) => {
    if (onSelectPlan) {
      onSelectPlan(planName);
    }
  };

  return (
    <section
      id="packages"
      className="sol-section sol-fullscreen-card"
      style={{ backgroundColor: '#F6F2EC' }}
    >
      <div className="sol-section-inner">
        <Reveal index={0} style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto clamp(10px, 2vh, 20px) auto' }}>
          <h2 className="editorial-headline" style={{ margin: 0, fontSize: 'clamp(1.7rem, 2.8vw, 2.5rem)' }}>
            CURATED{' '}
            <span className="editorial-flourish" style={{ fontStyle: 'italic', fontWeight: 300 }}>
              Residencies
            </span>
          </h2>
        </Reveal>

        {/* Mobile Tier Tabs */}
        <div className="pricing-tabs-mobile">
          {tiers.map((t, idx) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setMobileTierIdx(idx)}
              style={{
                background: mobileTierIdx === idx ? 'var(--color-text-main)' : 'transparent',
                color: mobileTierIdx === idx ? '#FAF8F5' : 'var(--color-text-muted)',
                border: '1px solid',
                borderColor: mobileTierIdx === idx ? 'var(--color-text-main)' : 'var(--color-border-medium)',
                padding: '4px 12px',
                borderRadius: '2px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.68rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              {t.name.replace('THE ', '')}
            </button>
          ))}
        </div>

        <div className="pricing-grid" style={{ marginTop: 'clamp(10px, 1.8vh, 22px)', gap: 'clamp(14px, 2vw, 24px)' }}>
          {tiers.map((tier, idx) => (
            <Reveal
              key={tier.id}
              index={idx}
              className={`pricing-card ${tier.featured ? 'featured' : ''} ${mobileTierIdx === idx ? 'mobile-active' : ''}`}
              style={{
                padding: 'clamp(16px, 2.2vh, 26px) clamp(16px, 2vw, 24px)',
              }}
            >
              {tier.featured && <div className="pricing-badge">MOST REVERED</div>}

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.18em',
                    color: 'var(--color-text-muted)',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                    fontWeight: 600,
                  }}
                >
                  {tier.duration}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.2rem, 1.6vw, 1.5rem)',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    margin: '0 0 8px 0',
                    color: 'var(--color-text-main)',
                  }}
                >
                  {tier.name}
                </h3>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '10px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(1.6rem, 2.2vw, 2.1rem)',
                      fontWeight: 500,
                      color: 'var(--color-text-main)',
                    }}
                  >
                    {tier.price}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.72rem',
                      color: 'var(--color-text-muted)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {tier.unit}
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(0.78rem, 0.95vw, 0.84rem)',
                    lineHeight: 1.5,
                    color: 'var(--color-text-muted)',
                    marginBottom: 'clamp(10px, 1.5vh, 16px)',
                    fontWeight: 300,
                  }}
                >
                  {tier.description}
                </p>

                <div
                  style={{
                    borderTop: '1px solid var(--color-border-subtle)',
                    paddingTop: 'clamp(8px, 1.2vh, 12px)',
                    marginBottom: 'clamp(12px, 1.8vh, 18px)',
                  }}
                >
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'grid',
                      gap: '6px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'clamp(0.74rem, 0.9vw, 0.78rem)',
                      color: 'var(--color-text-main)',
                      lineHeight: 1.4,
                    }}
                  >
                    {tier.perks.slice(0, 4).map((p, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ color: 'var(--color-accent-gold)', flexShrink: 0 }}>✦</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <ArrowButton
                  label="SELECT RESIDENCY"
                  href="#contact"
                  onClick={() => handleSelect(tier.name)}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

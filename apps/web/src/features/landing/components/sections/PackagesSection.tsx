import { ArrowButton } from '../ArrowButton';
import { Reveal } from '../../../../shared/ui/Reveal';

interface PackagesSectionProps {
  onSelectPlan?: (planName: string) => void;
}

export function PackagesSection({ onSelectPlan }: PackagesSectionProps) {
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
        'Priority studio waitlist allocation (SCMS VIP queue)',
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
    <section id="packages" className="sol-section" style={{ backgroundColor: '#F6F2EC' }}>
      <div className="sol-section-inner">
        <Reveal index={0} style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 20px auto' }}>
          <div className="editorial-category">MEMBERSHIP CURATIONS / 04</div>
          <h2 className="editorial-headline" style={{ marginBottom: '16px' }}>
            CURATED{' '}
            <span className="editorial-flourish" style={{ fontStyle: 'italic', fontWeight: 300 }}>
              Residencies
            </span>
          </h2>
          <p className="editorial-body" style={{ margin: '0 auto' }}>
            Membership at Söl Wellness Sanctuary is capped to preserve an uncrowded atmosphere of serenity and focus.
          </p>
        </Reveal>

        <div className="pricing-grid">
          {tiers.map((tier, idx) => (
            <Reveal key={tier.id} index={idx} className={`pricing-card ${tier.featured ? 'featured' : ''}`}>
              {tier.featured && <div className="pricing-badge">MOST REVERED</div>}

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.2em',
                    color: 'var(--color-text-muted)',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                    fontWeight: 600,
                  }}
                >
                  {tier.duration}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.9rem',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    margin: '0 0 16px 0',
                    color: 'var(--color-text-main)',
                  }}
                >
                  {tier.name}
                </h3>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '20px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '2.4rem',
                      fontWeight: 500,
                      color: 'var(--color-text-main)',
                    }}
                  >
                    {tier.price}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.75rem',
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
                    fontSize: '0.86rem',
                    lineHeight: 1.65,
                    color: 'var(--color-text-muted)',
                    marginBottom: '28px',
                    fontWeight: 300,
                  }}
                >
                  {tier.description}
                </p>

                <div
                  style={{
                    borderTop: '1px solid var(--color-border-subtle)',
                    paddingTop: '20px',
                    marginBottom: '36px',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-muted)',
                      marginBottom: '14px',
                      fontWeight: 600,
                    }}
                  >
                    INCLUDED PRIVILEGES
                  </div>
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'grid',
                      gap: '10px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.82rem',
                      color: 'var(--color-text-main)',
                      lineHeight: 1.5,
                    }}
                  >
                    {tier.perks.map((p, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <span style={{ color: 'var(--color-accent-gold)' }}>✦</span>
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

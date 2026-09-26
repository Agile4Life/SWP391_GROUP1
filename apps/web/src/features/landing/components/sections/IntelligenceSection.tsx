import { LiquidGlassShowcase } from '../../../../shared/liquid-glass';

export function IntelligenceSection() {
  const features = [
    {
      step: '01',
      title: 'DYNAMIC QR CHECK-IN',
      flowTag: 'SCMS FLOW 5',
      desc: 'Seamless turnstile verification with revolving encrypted QR codes generated in the mobile client. Instant validity auditing and capacity enforcement.',
    },
    {
      step: '02',
      title: 'AI BIOMETRIC COACHING',
      flowTag: 'SCMS FLOW 4',
      desc: 'Machine learning algorithms synthesize InBody body composition metrics, cardiovascular strain, and recovery indexes into bespoke periodized regimens.',
    },
    {
      step: '03',
      title: 'INTELLIGENT CLASS SCHEDULING',
      flowTag: 'SCMS FLOW 3',
      desc: 'Real-time studio capacity tracking with automated waitlist queue mechanics. Spots freed by cancellations are dynamically reassigned in seconds.',
    },
  ];

  return (
    <section id="intelligence" className="sol-section" style={{ backgroundColor: '#FAF8F5' }}>
      <div className="sol-section-inner">
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px auto' }}>
          <div className="editorial-category">INTELLIGENCE &amp; ARCHITECTURE / 03</div>
          <h2 className="editorial-headline" style={{ marginBottom: '18px' }}>
            THE ARCHITECTURE OF{' '}
            <span className="editorial-flourish" style={{ fontStyle: 'italic', fontWeight: 300 }}>
              Precision
            </span>
          </h2>
          <p className="editorial-body" style={{ margin: '0 auto' }}>
            Built upon Microsoft SQL Server 3NF relational architecture and high-performance microservices, Söl Wellness
            Sanctuary delivers frictionless operational execution.
          </p>
        </div>

        <div className="intelligence-grid">
          {features.map((feat) => (
            <div key={feat.step} className="intelligence-card">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '24px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.8rem',
                    color: 'var(--color-accent-gold)',
                  }}
                >
                  {feat.step}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-light)',
                    border: '1px solid var(--color-border-subtle)',
                    padding: '3px 8px',
                    borderRadius: '2px',
                  }}
                >
                  {feat.flowTag}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.35rem',
                  letterSpacing: '0.04em',
                  fontWeight: 500,
                  margin: '0 0 14px 0',
                  color: 'var(--color-text-main)',
                }}
              >
                {feat.title}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.88rem',
                  lineHeight: 1.7,
                  color: 'var(--color-text-muted)',
                  margin: 0,
                  fontWeight: 300,
                }}
              >
                {feat.desc}
              </p>
            </div>
          ))}
        </div>

        <LiquidGlassShowcase />
      </div>
    </section>
  );
}

export function IntelligenceSection() {
  const features = [
    {
      step: '01',
      title: 'DYNAMIC QR CHECK-IN',
      desc: 'Seamless turnstile verification with revolving encrypted QR codes generated in the mobile client. Instant validity auditing and capacity enforcement.',
    },
    {
      step: '02',
      title: 'AI BIOMETRIC COACHING',
      desc: 'Machine learning algorithms synthesize InBody body composition metrics, cardiovascular strain, and recovery indexes into bespoke periodized regimens.',
    },
    {
      step: '03',
      title: 'INTELLIGENT CLASS SCHEDULING',
      desc: 'Real-time studio capacity tracking with automated waitlist queue mechanics. Spots freed by cancellations are dynamically reassigned in seconds.',
    },
  ];

  return (
    <section
      id="intelligence"
      className="sol-section sol-fullscreen-card"
      style={{ backgroundColor: '#FAF8F5' }}
    >
      <div className="sol-section-inner">
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto clamp(20px, 3.5vh, 40px) auto' }}>
          <h2
            className="editorial-headline"
            style={{ margin: 0, fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)' }}
          >
            THE ARCHITECTURE OF{' '}
            <span className="editorial-flourish" style={{ fontStyle: 'italic', fontWeight: 300 }}>
              Precision
            </span>
          </h2>
        </div>

        <div className="intelligence-grid" style={{ gap: 'clamp(16px, 2vw, 24px)' }}>
          {features.map((feat) => (
            <div key={feat.step} className="intelligence-card">
              <div style={{ marginBottom: '24px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.8rem',
                    color: 'var(--color-accent-gold)',
                  }}
                >
                  {feat.step}
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
      </div>
    </section>
  );
}

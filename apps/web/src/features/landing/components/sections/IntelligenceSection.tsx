import { useTheme } from '../../../../shared/context/ThemeContext';
import { LANDING_IMAGES } from '../../assets/images';

const RUNOVA_PRODUCTS = [
  {
    id: 1,
    name: 'Sportverse Velocity X1',
    price: '$129 USD',
    category: 'Pro Squash & Racket',
    image: LANDING_IMAGES.runovaProduct1,
  },
  {
    id: 2,
    name: 'Runova Court Aero Pro',
    price: '$149 USD',
    category: 'Badminton Championship',
    image: LANDING_IMAGES.runovaRacketCourt,
  },
  {
    id: 3,
    name: 'Sportverse Spin Master',
    price: '$179 USD',
    category: 'Tennis Carbon Fiber',
    image: LANDING_IMAGES.runovaProduct2,
  },
  {
    id: 4,
    name: 'Runova Match Hybrid',
    price: '$139 USD',
    category: 'Padel Power Frame',
    image: LANDING_IMAGES.runovaAboutClay,
  },
];

export function IntelligenceSection() {
  const { theme } = useTheme();

  if (theme === 'runova') {
    return (
      <section id="intelligence" className="sol-section" style={{ backgroundColor: '#EFECE6', padding: '100px 48px' }}>
        <div className="sol-section-inner" style={{ maxWidth: '1240px' }}>
          {/* Header Row (Matching Reference Image 5) */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '54px',
              gap: '40px',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div
                className="runova-pill-badge"
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#16382C',
                  border: '1px solid rgba(22, 56, 44, 0.15)',
                  marginBottom: '20px',
                }}
              >
                Our Products &amp; AI Training
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.88rem',
                  color: '#4F5E54',
                  maxWidth: '360px',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Whether you&apos;re training for your first race or your next championship, Sportverse AI smart sensors
                track your swings and tactical execution.
              </p>
            </div>

            <div style={{ maxWidth: '640px' }}>
              <h2
                style={{
                  fontFamily: 'Barlow Condensed',
                  fontSize: 'clamp(3rem, 6.2vw, 5.2rem)',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  lineHeight: 0.95,
                  letterSpacing: '0.01em',
                  margin: 0,
                  color: '#111A14',
                }}
              >
                AT SPORTVERSE, <span style={{ color: '#8E9C92' }}>AI POWERS SMARTER</span> TRAINING
              </h2>
            </div>
          </div>

          {/* 4-Card Squircle Product/Equipment Grid (Matching Reference Image 5) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
            }}
          >
            {RUNOVA_PRODUCTS.map((prod) => (
              <div key={prod.id} style={{ display: 'flex', flexDirection: 'column' }}>
                <div
                  className="runova-squircle-card"
                  style={{
                    position: 'relative',
                    height: '280px',
                    borderRadius: '24px',
                    marginBottom: '16px',
                  }}
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />

                  {/* Top-Right Circular Action Icon */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(8px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      fontSize: '1rem',
                      cursor: 'pointer',
                    }}
                    title="Đặt thiết bị thi đấu"
                  >
                    🛍️
                  </div>
                </div>

                <div style={{ paddingLeft: '4px' }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: '1rem',
                      color: '#111A14',
                      fontFamily: 'var(--font-sans)',
                      marginBottom: '2px',
                    }}
                  >
                    {prod.name}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#627267', fontWeight: 600 }}>
                    {prod.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Original Söl Sanctuary Quiet Luxury Intelligence
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
      </div>
    </section>
  );
}


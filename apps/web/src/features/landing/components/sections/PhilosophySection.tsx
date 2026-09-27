import { useTheme } from '../../../../shared/context/ThemeContext';
import { LANDING_IMAGES } from '../../assets/images';
import { ArrowButton } from '../ArrowButton';

export function PhilosophySection() {
  const { theme } = useTheme();

  if (theme === 'runova') {
    return (
      <section id="about" className="sol-section" style={{ backgroundColor: '#EFECE6', padding: '100px 48px' }}>
        <div className="sol-section-inner" style={{ maxWidth: '1200px' }}>
          {/* Top Banner (Matching Reference Image 3) */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '24px 32px',
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
              marginBottom: '54px',
              boxShadow: '0 4px 20px rgba(22, 56, 44, 0.04)',
              border: '1px solid rgba(22, 56, 44, 0.08)',
              flexWrap: 'wrap',
            }}
          >
            <img
              src={LANDING_IMAGES.runovaAboutBanner}
              alt="Clay Tennis Court Net"
              style={{
                width: '180px',
                height: '84px',
                borderRadius: '16px',
                objectFit: 'cover',
              }}
            />
            <div style={{ flex: 1, minWidth: '280px' }}>
              <p
                style={{
                  margin: 0,
                  fontSize: 'clamp(1.1rem, 2.2vw, 1.45rem)',
                  fontWeight: 700,
                  color: '#111A14',
                  lineHeight: 1.45,
                  fontFamily: 'var(--font-sans)',
                }}
              >
                At Runova, we redefine how athletes train and perform.{' '}
                <span style={{ color: '#627267', fontWeight: 500 }}>
                  From personalized workout plans to real-time progress tracking.
                </span>
              </p>
            </div>
          </div>

          {/* Main 3-Column Content Layout (Matching Reference Image 3) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.15fr 0.9fr',
              gap: '40px',
              alignItems: 'center',
            }}
          >
            {/* Column 1: Intro & CTA */}
            <div>
              <div
                className="runova-pill-badge"
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#16382C',
                  border: '1px solid rgba(22, 56, 44, 0.15)',
                  marginBottom: '28px',
                }}
              >
                About Runova
              </div>

              <h2
                style={{
                  fontFamily: 'Barlow Condensed',
                  fontSize: 'clamp(2.4rem, 4vw, 3.4rem)',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  color: '#111A14',
                  lineHeight: 1.05,
                  letterSpacing: '0.02em',
                  marginBottom: '20px',
                }}
              >
                ELEVATE YOUR <br />
                COURT CRAFT
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.95rem',
                  color: '#4F5E54',
                  lineHeight: 1.7,
                  marginBottom: '36px',
                }}
              >
                Whether you&apos;re training for your first race or your next championship, Runova keeps you motivated,
                equipped, and connected to our athletic community.
              </p>

              <a
                href="#contact"
                className="runova-cta-btn"
                style={{
                  backgroundColor: '#111A14',
                  color: '#FAF8F5',
                }}
              >
                <span>Get In Touch</span>
                <span style={{ fontSize: '1.05rem' }}>↗</span>
              </a>
            </div>

            {/* Column 2: Center Athlete Photo */}
            <div style={{ textAlign: 'center' }}>
              <div
                className="runova-squircle-card"
                style={{
                  height: '420px',
                  boxShadow: '0 20px 40px -10px rgba(22, 56, 44, 0.18)',
                }}
              >
                <img
                  src={LANDING_IMAGES.runovaAboutPlayer}
                  alt="Athlete ready on court"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* Column 3: Secondary Racket Feature Card */}
            <div>
              <div
                className="runova-squircle-card"
                style={{
                  position: 'relative',
                  height: '240px',
                  marginBottom: '24px',
                }}
              >
                <img
                  src={LANDING_IMAGES.runovaAboutRacket}
                  alt="Racket on hard court"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <button
                  type="button"
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '16px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#111A14',
                    color: '#FFFFFF',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                  }}
                  title="Xem chi tiết"
                >
                  +
                </button>
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.88rem',
                  color: '#4F5E54',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                Get access to upcoming events, expert coaching insights, and stories from athletes across the globe.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Original Söl Sanctuary Quiet Luxury Philosophy
  return (
    <section id="about" className="sol-section" style={{ backgroundColor: '#FAF8F5' }}>
      <div className="sol-section-inner">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.05fr 1.25fr',
            gap: '64px',
            alignItems: 'center',
          }}
        >
          {/* Narrative Column */}
          <div>
            <div className="editorial-category">PHILOSOPHY / 01</div>

            <h2
              className="editorial-headline"
              style={{
                fontSize: 'clamp(2.6rem, 4.8vw, 4rem)',
                lineHeight: 1.08,
                marginBottom: '26px',
              }}
            >
              <span className="editorial-flourish" style={{ fontStyle: 'italic', marginRight: '6px' }}>
                Train
              </span>{' '}
              WITH
              <br />
              INTENTION
            </h2>

            <p className="editorial-body" style={{ maxWidth: '480px', marginBottom: '32px' }}>
              At Söl Wellness Sanctuary, we believe that physical conditioning is not just about raw exertion — it&apos;s
              about how every movement calibrates your body and mind. We approach athletic longevity as a layered
              composition of breath, biomechanics, and intelligent recovery, where discipline meets quiet clarity.
            </p>

            <ArrowButton label="EXPLORE OUR DISCIPLINES" href="#disciplines" />
          </div>

          {/* Asymmetric Gallery */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.3fr 1fr',
              gap: '24px',
              alignItems: 'start',
            }}
          >
            <div
              className="image-card-wrapper"
              style={{
                height: '480px',
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.08)',
              }}
            >
              <img
                src={LANDING_IMAGES.aboutPrimary}
                alt="Organic wood movement sanctuary studio"
                loading="lazy"
              />
            </div>

            <div
              className="image-card-wrapper"
              style={{
                height: '340px',
                marginTop: '48px',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.06)',
              }}
            >
              <img
                src={LANDING_IMAGES.aboutSecondary}
                alt="Thermal recovery lounge and fireplace"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* 3 Pillar Stats */}
        <div className="pillar-stats-grid">
          <div>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.5rem',
                color: 'var(--color-text-main)',
                marginBottom: '8px',
              }}
            >
              01
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px' }}>
              Kinetic Alignment
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
              Corrective posture restoration, mobility expansion, and spine decompression guided by master coaches.
            </p>
          </div>

          <div>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.5rem',
                color: 'var(--color-text-main)',
                marginBottom: '8px',
              }}
            >
              02
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px' }}>
              Biometric Precision
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
              AI Engine parses InBody biomarkers, HRV recovery metrics, and workout histories to calibrate adaptive training regimens.
            </p>
          </div>

          <div>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.5rem',
                color: 'var(--color-text-main)',
                marginBottom: '8px',
              }}
            >
              03
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px' }}>
              Thermal Recovery
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
              Contrast therapy pools, Himalayan salt stone saunas, and pneumatic compression lounges for expedited cellular renewal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


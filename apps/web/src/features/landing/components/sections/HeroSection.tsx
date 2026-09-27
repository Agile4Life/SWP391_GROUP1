import { useTheme } from '../../../../shared/context/ThemeContext';
import { LANDING_IMAGES } from '../../assets/images';
import { ArrowButton } from '../ArrowButton';
import { LiquidGlassContainer } from '../../../../shared/liquid-glass/LiquidGlassContainer';

export function HeroSection() {
  const { theme } = useTheme();

  if (theme === 'runova') {
    return (
      <section
        id="hero"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          backgroundImage: `linear-gradient(180deg, rgba(22, 56, 44, 0.72) 0%, rgba(17, 43, 34, 0.88) 100%), url(${LANDING_IMAGES.runovaHeroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '120px 48px 60px 48px',
          color: '#FAF8F5',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        {/* Background Watermark */}
        <div className="runova-hero-watermark">RUNOVA CLUB</div>

        {/* Top Floating Widgets Row (Matching Reference Image 2) */}
        <div
          style={{
            width: '100%',
            maxWidth: '1280px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            zIndex: 10,
            gap: '24px',
            flexWrap: 'wrap',
          }}
        >
          {/* Top-Left Avatar Community Card */}
          <div style={{ maxWidth: '380px' }}>
            <LiquidGlassContainer
              shape="pill"
              borderRadius={32}
              tintOpacity={0.25}
              style={{
                padding: '12px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              {/* Avatar Stack */}
              <div style={{ display: 'flex', marginLeft: '4px' }}>
                <img
                  src={LANDING_IMAGES.runovaPlayerSasha}
                  alt="Athlete"
                  style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #16382C', objectFit: 'cover' }}
                />
                <img
                  src={LANDING_IMAGES.runovaStatAthlete}
                  alt="Athlete"
                  style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #16382C', marginLeft: '-10px', objectFit: 'cover' }}
                />
                <img
                  src={LANDING_IMAGES.runovaPlayerNaomi}
                  alt="Athlete"
                  style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #16382C', marginLeft: '-10px', objectFit: 'cover' }}
                />
              </div>

              <div style={{ fontSize: '0.75rem', lineHeight: 1.45, color: 'rgba(255, 255, 255, 0.92)' }}>
                Our intelligent training tools, event updates, and community push performance beyond limits.
              </div>
            </LiquidGlassContainer>
          </div>

          {/* Top-Right Limited Slots Widget */}
          <div>
            <LiquidGlassContainer
              shape="rounded"
              borderRadius={20}
              tintOpacity={0.28}
              style={{
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                maxWidth: '320px',
              }}
            >
              <img
                src={LANDING_IMAGES.runovaRacketCourt}
                alt="Court Preview"
                style={{ width: '56px', height: '56px', borderRadius: '12px', objectFit: 'cover' }}
              />
              <div>
                <div
                  style={{
                    fontFamily: 'Barlow Condensed',
                    fontSize: '1rem',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: '#D4E95C',
                    marginBottom: '2px',
                  }}
                >
                  LIMITED SLOTS AVAILABLE
                </div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.35 }}>
                  Our online training tools and court updates connect players in real time.
                </div>
              </div>
            </LiquidGlassContainer>
          </div>
        </div>

        {/* Center / Bottom Giant Headline & CTA (Matching Reference Image 2) */}
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', margin: 'auto 0 20px 0' }}>
          <h1 className="runova-sports-passion">
            SPORTS
            <span className="runova-passion-outline">PASSION</span>
          </h1>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '32px', flexWrap: 'wrap' }}>
            <a
              href="#packages"
              className="runova-cta-btn"
              style={{
                backgroundColor: '#FFFFFF',
                color: '#111A14',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
              }}
            >
              <span>Join a Sport</span>
              <span style={{ fontSize: '1.1rem' }}>↗</span>
            </a>

            <a
              href="#disciplines"
              className="runova-cta-btn"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                color: '#FAF8F5',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <span>Explore Facilities</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Bottom decorative court indicator */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.75rem',
            color: 'rgba(255, 255, 255, 0.7)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#D4E95C' }} />
          <span>RUNOVA TOURNAMENT ARENA • HIGH-PERFORMANCE COURT &amp; RACKET CLUB</span>
        </div>
      </section>
    );
  }

  // Original Söl Sanctuary Quiet Luxury Hero
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundImage: `linear-gradient(rgba(24, 20, 18, 0.45), rgba(24, 20, 18, 0.7)), url(${LANDING_IMAGES.heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '120px 24px 60px 24px',
        color: '#FAF8F5',
        boxSizing: 'border-box',
      }}
    >
      {/* Background Watermark */}
      <div
        style={{
          position: 'absolute',
          top: '90px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(3.5rem, 12vw, 10.5rem)',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(255, 255, 255, 0.07)',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          zIndex: 1,
        }}
      >
        SÖL SANCTUARY
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '880px', margin: '0 auto' }}>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.8rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--color-accent-sand)',
            marginBottom: '20px',
            fontWeight: 500,
          }}
        >
          SPORTS CENTER MANAGEMENT SYSTEM • EST. 2026
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(3.2rem, 8vw, 6.4rem)',
            lineHeight: 1.02,
            letterSpacing: '0.03em',
            color: '#FFFFFF',
            textShadow: '0 4px 30px rgba(0, 0, 0, 0.35)',
            marginBottom: '26px',
            fontWeight: 400,
          }}
        >
          DISCIPLINE.
          <br />
          <span style={{ fontStyle: 'italic', fontWeight: 300, letterSpacing: '0.05em' }}>
            Movement.
          </span>
          <br />
          MASTERY.
        </h1>

        <p
          style={{
            color: 'rgba(250, 248, 245, 0.88)',
            fontSize: '1.08rem',
            lineHeight: 1.85,
            maxWidth: '580px',
            margin: '0 auto 40px auto',
            fontFamily: 'var(--font-sans)',
            fontWeight: 300,
          }}
        >
          Söl Wellness Sanctuary is an architectural health and sports club designed for intentional movement, precision
          AI biometric calibration, and enduring physical longevity.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '36px', flexWrap: 'wrap' }}>
          <ArrowButton
            label="EXPLORE PHILOSOPHY"
            href="#about"
            style={{ color: '#FAF8F5' }}
          />
          <ArrowButton
            label="CURATED MEMBERSHIPS"
            href="#packages"
            style={{ color: 'var(--color-accent-sand)' }}
          />
        </div>
      </div>
    </section>
  );
}


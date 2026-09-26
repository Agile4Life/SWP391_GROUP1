import { LANDING_IMAGES } from '../../assets/images';
import { ArrowButton } from '../ArrowButton';

export function HeroSection() {
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

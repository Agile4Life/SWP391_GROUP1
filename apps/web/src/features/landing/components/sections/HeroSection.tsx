import { LANDING_IMAGES } from '../../assets/images';
import { ArrowButton } from '../ArrowButton';

interface HeroSectionProps {
  onNavigate?: (index: number) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="sol-section sol-fullscreen-card"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        backgroundImage: `linear-gradient(rgba(24, 20, 18, 0.45), rgba(24, 20, 18, 0.7)), url(${LANDING_IMAGES.heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 'clamp(64px, 8vh, 90px) 24px clamp(32px, 5vh, 48px) 24px',
        color: '#FAF8F5',
        boxSizing: 'border-box',
      }}
    >
      {/* Background Watermark */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(60px, 9vh, 90px)',
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
            fontSize: 'clamp(0.72rem, 1vw, 0.8rem)',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--color-accent-sand)',
            marginBottom: 'clamp(12px, 2vh, 20px)',
            fontWeight: 500,
          }}
        >
          SPORTS CENTER MANAGEMENT SYSTEM • EST. 2026
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.8rem, 6.5vw, 5.8rem)',
            lineHeight: 1.02,
            letterSpacing: '0.03em',
            color: '#FFFFFF',
            textShadow: '0 4px 30px rgba(0, 0, 0, 0.35)',
            marginBottom: 'clamp(14px, 2.5vh, 24px)',
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
            fontSize: 'clamp(0.92rem, 1.2vw, 1.05rem)',
            lineHeight: 1.75,
            maxWidth: '580px',
            margin: '0 auto clamp(24px, 4vh, 36px) auto',
            fontFamily: 'var(--font-sans)',
            fontWeight: 300,
          }}
        >
          Söl Wellness Sanctuary is an architectural health and sports club designed for intentional movement, precision
          AI biometric calibration, and enduring physical longevity.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
          <ArrowButton
            label="EXPLORE PHILOSOPHY"
            href="#about"
            onClick={() => onNavigate?.(1)}
            style={{ color: '#FAF8F5' }}
          />
          <ArrowButton
            label="CURATED MEMBERSHIPS"
            href="#packages"
            onClick={() => onNavigate?.(4)}
            style={{ color: 'var(--color-accent-sand)' }}
          />
        </div>
      </div>
    </section>
  );
}

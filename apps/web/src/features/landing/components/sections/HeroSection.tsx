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
        overflow: 'hidden',
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
      {/* Background Image Layer with slow-zoom animation */}
      <div
        className="hero-bg-layer"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(24, 20, 18, 0.45), rgba(24, 20, 18, 0.7)), url(${LANDING_IMAGES.heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          zIndex: 0,
          willChange: 'transform',
          animation: 'slow-zoom 14s var(--ease-luxury) both',
        }}
      />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '880px', margin: '0 auto' }}>
        <h1
          aria-label="DISCIPLINE. Movement. MASTERY."
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
          <span style={{ display: 'block', overflow: 'hidden' }}>
            <span
              style={{
                display: 'block',
                animation: 'hero-slide-up var(--dur-slow) var(--ease-luxury) both',
                animationDelay: '0ms',
              }}
            >
              DISCIPLINE.
            </span>
          </span>
          <span style={{ display: 'block', overflow: 'hidden' }}>
            <span
              style={{
                display: 'block',
                fontStyle: 'italic',
                fontWeight: 300,
                letterSpacing: '0.05em',
                animation: 'hero-slide-up var(--dur-slow) var(--ease-luxury) both',
                animationDelay: '90ms',
              }}
            >
              Movement.
            </span>
          </span>
          <span style={{ display: 'block', overflow: 'hidden' }}>
            <span
              style={{
                display: 'block',
                animation: 'hero-slide-up var(--dur-slow) var(--ease-luxury) both',
                animationDelay: '180ms',
              }}
            >
              MASTERY.
            </span>
          </span>
        </h1>

        <div
          className="anim-fade-up"
          style={{
            animationDelay: '420ms',
            marginTop: 'clamp(24px, 4vh, 36px)',
            display: 'flex',
            justifyContent: 'center',
            gap: '32px',
            flexWrap: 'wrap',
          }}
        >
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

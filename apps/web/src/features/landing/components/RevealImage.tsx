import { useEffect, useRef, useState } from 'react';

export interface RevealImageProps {
  src: string;
  alt: string;
  className?: string;
  wrapperStyle?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number; // seconds
  curtainColor?: string;
  loading?: 'lazy' | 'eager';
  isActive?: boolean;
}

export function RevealImage({
  src,
  alt,
  className = '',
  wrapperStyle,
  imgStyle,
  direction = 'right',
  delay = 0,
  curtainColor,
  loading = 'lazy',
  isActive,
}: RevealImageProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive) {
      setIsRevealed(true);
    }
  }, [isActive]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const getOrigin = () => {
    switch (direction) {
      case 'left':
        return 'left center';
      case 'up':
        return 'center top';
      case 'down':
        return 'center bottom';
      case 'right':
      default:
        return 'right center';
    }
  };

  const getTransform = () => {
    if (!isRevealed) {
      return direction === 'up' || direction === 'down' ? 'scaleY(1)' : 'scaleX(1)';
    }
    return direction === 'up' || direction === 'down' ? 'scaleY(0)' : 'scaleX(0)';
  };

  return (
    <div
      ref={containerRef}
      className={`sol-reveal-wrapper ${isRevealed ? 'is-revealed' : ''} ${className}`}
      style={{
        ...wrapperStyle,
      }}
    >
      {/* Luxury Curtain Layer */}
      <div
        className="sol-reveal-curtain"
        style={{
          transformOrigin: getOrigin(),
          transform: getTransform(),
          transitionDelay: `${delay}s`,
          backgroundColor: curtainColor,
        }}
        aria-hidden="true"
      />

      {/* Target Image */}
      <img
        src={src}
        alt={alt}
        loading={loading}
        className="sol-reveal-img"
        style={{
          transitionDelay: `${delay + 0.12}s`,
          ...imgStyle,
        }}
      />
    </div>
  );
}

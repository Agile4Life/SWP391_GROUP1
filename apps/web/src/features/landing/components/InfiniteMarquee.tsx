interface InfiniteMarqueeProps {
  phrases?: string[];
  className?: string;
}

export function InfiniteMarquee({
  phrases = [
    'GET IN TOUCH',
    'ELEVATE YOUR STRENGTH',
    'DISCIPLINE & MASTERY',
    'JOIN THE SANCTUARY',
    'MINDFUL MOVEMENT',
  ],
  className = '',
}: InfiniteMarqueeProps) {
  // Multiply phrases to ensure smooth looping across ultrawide monitors
  const repeated = [...phrases, ...phrases, ...phrases, ...phrases];

  return (
    <div className={`aura-marquee-band ${className}`} aria-hidden="true">
      <div className="aura-marquee-track">
        {repeated.map((phrase, idx) => (
          <div key={`${phrase}-${idx}`} className="marquee-phrase">
            <span>{phrase}</span>
            <span className="marquee-star">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

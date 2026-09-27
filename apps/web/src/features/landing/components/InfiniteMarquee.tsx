import { useTheme } from '../../../shared/context/ThemeContext';

interface InfiniteMarqueeProps {
  phrases?: string[];
  className?: string;
}

export function InfiniteMarquee({ phrases, className = '' }: InfiniteMarqueeProps) {
  const { theme } = useTheme();

  const defaultPhrases =
    theme === 'runova'
      ? [
          'RUNOVA ATHLETIC CLUB',
          'HIGH-PERFORMANCE COURT',
          'SMART AI TRAINING',
          'CHAMPIONSHIP ARENA',
          'SPORTVERSE PASS',
        ]
      : [
          'GET IN TOUCH',
          'ELEVATE YOUR STRENGTH',
          'DISCIPLINE & MASTERY',
          'JOIN THE SANCTUARY',
          'MINDFUL MOVEMENT',
        ];

  const activePhrases = phrases || defaultPhrases;
  // Multiply phrases to ensure smooth looping across ultrawide monitors
  const repeated = [...activePhrases, ...activePhrases, ...activePhrases, ...activePhrases];

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

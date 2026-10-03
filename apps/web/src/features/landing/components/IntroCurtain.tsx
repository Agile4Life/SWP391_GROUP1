import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { INTRO_SEEN_KEY } from '../introSession';

const COUNT_MS = 1700;
const LEAVE_MS = 850;

interface IntroCurtainProps {
  /** Gọi khi màn che bắt đầu mở — Hero bắt đầu animation. */
  onReveal: () => void;
  /** Gọi khi màn che đã mở xong — có thể unmount. */
  onFinish: () => void;
}

/** Màn intro lần đầu mỗi phiên: logo SÖL + đường nhịp tim + bộ đếm, rồi màn che trượt lên. */
export function IntroCurtain({ onReveal, onFinish }: IntroCurtainProps) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const leavingRef = useRef(false);

  const leave = () => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, '1');
    } catch {
      // sessionStorage không khả dụng
    }
    setLeaving(true);
    onReveal();
    window.setTimeout(onFinish, LEAVE_MS);
  };

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / COUNT_MS);
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const timer = window.setTimeout(leave, COUNT_MS + 150);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`intro-curtain ${leaving ? 'is-leaving' : ''}`} role="presentation">
      <div className="intro-curtain__inner">
        <div className="intro-brand" aria-label="SÖL">
          {['S', 'Ö', 'L'].map((ch, i) => (
            <span key={ch} style={{ '--i': i } as CSSProperties}>
              {ch}
            </span>
          ))}
        </div>
        <div className="intro-tagline">Wellness Sanctuary</div>

        <svg className="intro-ecg" viewBox="0 0 600 80" preserveAspectRatio="none" aria-hidden="true">
          <path className="intro-ecg__track" d="M0 40 H600" />
          <path
            className="intro-ecg__line"
            pathLength={1}
            d="M0 40 H170 L190 40 L204 14 L222 70 L238 32 L250 40 H330 L344 28 L358 52 L370 40 H430 L442 6 L458 76 L472 40 H600"
          />
        </svg>

        <div className="intro-meta">
          <span>Discipline · Movement · Mastery</span>
          <span className="intro-count">{String(count).padStart(3, '0')}</span>
        </div>
      </div>

      <button type="button" className="intro-skip" onClick={leave}>
        BỎ QUA
      </button>
    </div>
  );
}

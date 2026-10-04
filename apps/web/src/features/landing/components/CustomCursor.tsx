import { useEffect, useRef, useState } from 'react';

const INTERACTIVE = 'a, button, [role="button"], input, select, textarea, label';

/** Con trỏ chấm + vòng trễ theo chuột. Tự tắt trên cảm ứng và khi giảm chuyển động. */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled] = useState(
    () =>
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!enabled || !dot || !ring) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      const inDialog = !!(e.target as Element | null)?.closest?.('dialog');
      if (inDialog) {
        dot.classList.remove('is-visible');
        ring.classList.remove('is-visible');
      } else {
        dot.classList.add('is-visible');
        ring.classList.add('is-visible');
        ring.classList.toggle('is-hover', !!(e.target as Element | null)?.closest?.(INTERACTIVE));
      }
    };
    const down = () => ring.classList.add('is-down');
    const up = () => ring.classList.remove('is-down');
    const hide = () => {
      dot.classList.remove('is-visible');
      ring.classList.remove('is-visible');
    };
    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    document.documentElement.classList.add('has-custom-cursor');
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    document.documentElement.addEventListener('pointerleave', hide);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.documentElement.removeEventListener('pointerleave', hide);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}

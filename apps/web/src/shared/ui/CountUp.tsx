import React from 'react';
import { useInView } from '../../hooks/useInView';
import { useCountUp } from '../../hooks/useCountUp';

interface CountUpProps {
  value: number | string;
  format?: (val: number) => string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function CountUp({
  value,
  format,
  duration = 1200,
  className = '',
  style,
}: CountUpProps) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.2);

  const isNumeric = typeof value === 'number' && !Number.isNaN(value);
  const targetNumber = isNumeric ? value : 0;
  const currentCount = useCountUp(targetNumber, inView, duration);

  if (!isNumeric) {
    return <span className={className} style={style}>{value}</span>;
  }

  const formattedValue = format
    ? format(currentCount)
    : Math.round(currentCount).toLocaleString('vi-VN');

  return (
    <span
      ref={ref}
      className={`tabular-nums ${className}`.trim()}
      style={{
        fontVariantNumeric: 'tabular-nums',
        ...style,
      }}
    >
      {formattedValue}
    </span>
  );
}

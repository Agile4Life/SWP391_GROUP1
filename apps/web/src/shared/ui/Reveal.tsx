import React, { ReactNode } from 'react';
import { useInView } from '../../hooks/useInView';

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  index?: number;
  className?: string;
  threshold?: number;
}

export function Reveal({
  children,
  index = 0,
  className = '',
  threshold = 0.15,
  style,
  ...rest
}: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>(threshold);

  const customStyle: React.CSSProperties = {
    ...style,
    ['--i' as string]: index,
  };

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'is-visible' : ''} ${className}`.trim()}
      style={customStyle}
      {...rest}
    >
      {children}
    </div>
  );
}

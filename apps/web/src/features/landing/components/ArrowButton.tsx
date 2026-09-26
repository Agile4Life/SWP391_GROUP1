import React from 'react';

interface ArrowButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ArrowButton({ label, onClick, href, className = '', style }: ArrowButtonProps) {
  const content = (
    <>
      <span className="arrow-text">{label}</span>
      <span className="arrow-line" aria-hidden="true" />
      <span className="arrow-icon" aria-hidden="true">
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M1 5H13M13 5L9 1M13 5L9 9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={`arrow-action-link ${className}`} style={style}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`arrow-action-link ${className}`} style={style}>
      {content}
    </button>
  );
}

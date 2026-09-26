interface ViewModeToggleProps {
  mode: 'deck' | 'scroll';
  onChange: (mode: 'deck' | 'scroll') => void;
}

export function ViewModeToggle({ mode, onChange }: ViewModeToggleProps) {
  return (
    <div className="view-mode-badge" role="group" aria-label="View Mode Toggle">
      <span style={{ fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#968E85' }}>
        MODE:
      </span>
      <button
        type="button"
        className={`view-mode-btn ${mode === 'deck' ? 'active' : ''}`}
        onClick={() => onChange('deck')}
        title="Trình chiếu Slide (giống giao diện mẫu)"
      >
        Deck View
      </button>
      <button
        type="button"
        className={`view-mode-btn ${mode === 'scroll' ? 'active' : ''}`}
        onClick={() => onChange('scroll')}
        title="Cuộn liên tục toàn trang"
      >
        Full Scroll
      </button>
    </div>
  );
}

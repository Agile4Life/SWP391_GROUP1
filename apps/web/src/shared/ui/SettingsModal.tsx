import React, { useEffect } from 'react';
import { useTheme, ThemeMode } from '../context/ThemeContext';
import { LiquidGlassContainer } from '../liquid-glass/LiquidGlassContainer';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const themes: Array<{
    id: ThemeMode;
    name: string;
    subtitle: string;
    tag: string;
    colors: string[];
    description: string;
    icon: string;
  }> = [
    {
      id: 'sol',
      name: 'Söl Sanctuary',
      subtitle: 'Quiet Luxury Wellness & Longevity',
      tag: 'GIAO DIỆN 1 (GỐC)',
      colors: ['#FAF8F5', '#C2A684', '#1A1614'],
      description: 'Phong cách nghỉ dưỡng chậm, phục hồi tế bào, Yoga, Reformer Pilates & Zen Spa quý phái.',
      icon: '🏛️',
    },
    {
      id: 'runova',
      name: 'Runova Athletic',
      subtitle: 'Modern High-Performance Court Club',
      tag: 'GIAO DIỆN 2 (MỚI)',
      colors: ['#EFECE6', '#16382C', '#D4E95C'],
      description: 'Phong cách thi đấu thể thao hiện đại, Tennis, Cầu lông, Padel & AI Training thời thượng.',
      icon: '🎾',
    },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(10, 15, 12, 0.65)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        padding: '20px',
        animation: 'settingsFadeIn 0.25s ease-out',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.35)',
          overflow: 'hidden',
          border: '1px solid rgba(0, 0, 0, 0.08)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 30px',
            borderBottom: '1px solid rgba(0, 0, 0, 0.07)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: theme === 'runova' ? '#F6F4EE' : '#FAF8F5',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.25rem' }}>⚙️</span>
              <h2
                style={{
                  margin: 0,
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#111A14',
                  fontFamily: 'var(--font-sans)',
                  letterSpacing: '0.01em',
                }}
              >
                Cài Đặt Giao Diện Hệ Thống (Theme Settings)
              </h2>
            </div>
            <p
              style={{
                margin: '4px 0 0 0',
                fontSize: '0.82rem',
                color: '#627267',
                fontFamily: 'var(--font-sans)',
              }}
            >
              Chọn 1 trong 2 phong cách giao diện để trải nghiệm hoặc demo so sánh với giáo viên.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              color: '#8E9C92',
              cursor: 'pointer',
              lineHeight: 1,
              padding: '6px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
            title="Đóng"
          >
            ✕
          </button>
        </div>

        {/* Theme selection grid */}
        <div style={{ padding: '28px 30px', display: 'grid', gap: '18px' }}>
          {themes.map((t) => {
            const isSelected = theme === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setTheme(t.id)}
                style={{
                  display: 'flex',
                  alignItems: 'stretch',
                  padding: '20px 22px',
                  borderRadius: '18px',
                  border: isSelected
                    ? t.id === 'runova'
                      ? '2px solid #16382C'
                      : '2px solid #C2A684'
                    : '1px solid rgba(0, 0, 0, 0.1)',
                  backgroundColor: isSelected
                    ? t.id === 'runova'
                      ? 'rgba(212, 233, 92, 0.12)'
                      : 'rgba(194, 166, 132, 0.09)'
                    : '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  transform: isSelected ? 'translateY(-2px)' : 'none',
                  boxShadow: isSelected
                    ? '0 10px 25px -5px rgba(0, 0, 0, 0.08)'
                    : 'none',
                }}
              >
                {/* Icon & Color Palette preview */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '20px',
                    minWidth: '72px',
                  }}
                >
                  <span style={{ fontSize: '2.2rem', marginBottom: '8px' }}>{t.icon}</span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {t.colors.map((c, i) => (
                      <span
                        key={i}
                        style={{
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          backgroundColor: c,
                          border: '1px solid rgba(0,0,0,0.15)',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        color: '#111A14',
                        fontFamily: 'var(--font-sans)',
                      }}
                    >
                      {t.name}
                    </h3>
                    <span
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        padding: '3px 8px',
                        borderRadius: '9999px',
                        backgroundColor: isSelected
                          ? t.id === 'runova'
                            ? '#16382C'
                            : '#8C7765'
                          : '#EAE6DF',
                        color: isSelected ? '#FFFFFF' : '#627267',
                      }}
                    >
                      {t.tag}
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: isSelected
                        ? t.id === 'runova'
                          ? '#16382C'
                          : '#8C7765'
                        : '#7A857E',
                      marginBottom: '6px',
                    }}
                  >
                    {t.subtitle}
                  </div>

                  <p
                    style={{
                      margin: 0,
                      fontSize: '0.8rem',
                      color: '#4F5E54',
                      lineHeight: 1.5,
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    {t.description}
                  </p>
                </div>

                {/* Checkmark circle */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingLeft: '14px',
                  }}
                >
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      border: isSelected
                        ? 'none'
                        : '2px solid #CBD5E1',
                      backgroundColor: isSelected
                        ? t.id === 'runova'
                          ? '#16382C'
                          : '#8C7765'
                        : 'transparent',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                    }}
                  >
                    {isSelected ? '✓' : ''}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info banner */}
        <div
          style={{
            padding: '16px 30px',
            backgroundColor: '#F8F9FA',
            borderTop: '1px solid rgba(0, 0, 0, 0.06)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.78rem',
            color: '#627267',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>💡</span>
            <span>Theme được lưu tự động và áp dụng trên toàn bộ trang Landing &amp; Cổng Portal.</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '8px 20px',
              borderRadius: '9999px',
              border: 'none',
              backgroundColor: theme === 'runova' ? '#16382C' : '#211C18',
              color: theme === 'runova' ? '#D4E95C' : '#FFFFFF',
              fontWeight: 600,
              fontSize: '0.82rem',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
            }}
          >
            Đóng &amp; Trải Nghiệm
          </button>
        </div>
      </div>
    </div>
  );
}

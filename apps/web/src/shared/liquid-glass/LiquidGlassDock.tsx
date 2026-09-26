import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LiquidGlassContainer } from './LiquidGlassContainer';
import { LiquidGlassButton } from './LiquidGlassButton';
import { LiquidGlassControls } from './LiquidGlassControls';
import './liquid-glass.css';

export function LiquidGlassDock() {
  const navigate = useNavigate();
  const [showControls, setShowControls] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="liquid-glass-dock" aria-label="Liquid Glass Quick Navigation Dock">
        {isMinimized ? (
          <LiquidGlassButton
            shape="circle"
            size={16}
            onClick={() => setIsMinimized(false)}
            title="Mở thanh điều khiển Liquid Glass Dock"
            style={{ width: '48px', height: '48px' }}
          >
            🍎
          </LiquidGlassButton>
        ) : (
          <LiquidGlassContainer
            shape="pill"
            borderRadius={32}
            tintOpacity={0.18}
            style={{
              padding: '8px 14px',
              gap: '8px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.15)',
            }}
          >
            <LiquidGlassButton
              shape="pill"
              size={12}
              onClick={() => scrollTo('hero')}
              style={{ padding: '8px 14px' }}
              title="Về đầu trang"
            >
              <span>✦ SÖL SANCTUARY</span>
            </LiquidGlassButton>

            <LiquidGlassButton
              shape="pill"
              size={12}
              onClick={() => scrollTo('disciplines')}
              style={{ padding: '8px 14px' }}
            >
              <span>BỘ MÔN</span>
            </LiquidGlassButton>

            <LiquidGlassButton
              shape="pill"
              size={12}
              onClick={() => scrollTo('intelligence')}
              style={{ padding: '8px 14px' }}
            >
              <span>AI BIOMETRIC</span>
            </LiquidGlassButton>

            <LiquidGlassButton
              shape="pill"
              size={12}
              onClick={() => scrollTo('packages')}
              style={{ padding: '8px 14px' }}
            >
              <span>GÓI TẬP</span>
            </LiquidGlassButton>

            <LiquidGlassButton
              shape="circle"
              size={14}
              onClick={() => setShowControls(!showControls)}
              title="Bật/Tắt Bộ Điều Chỉnh Liquid Glass Shaders"
              style={{ width: '38px', height: '38px' }}
            >
              ⚙️
            </LiquidGlassButton>

            <LiquidGlassButton
              shape="pill"
              size={12}
              onClick={() => navigate('/login')}
              style={{
                padding: '8px 16px',
                background: 'rgba(255, 255, 255, 0.12)',
              }}
              title="Đăng nhập Cổng Quản Trị & Hội Viên"
            >
              <span>PORTAL LOGIN →</span>
            </LiquidGlassButton>

            <button
              type="button"
              onClick={() => setIsMinimized(true)}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(250, 248, 245, 0.6)',
                cursor: 'pointer',
                fontSize: '0.8rem',
                padding: '4px 6px',
              }}
              title="Thu nhỏ thanh dock"
            >
              ✕
            </button>
          </LiquidGlassContainer>
        )}
      </div>

      {/* Floating Shader Controls Panel */}
      <LiquidGlassControls
        isOpen={showControls}
        onClose={() => setShowControls(false)}
      />
    </>
  );
}

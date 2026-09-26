import { useState } from 'react';
import { LiquidGlassContainer } from './LiquidGlassContainer';
import { LiquidGlassButton } from './LiquidGlassButton';
import './liquid-glass.css';

export function LiquidGlassShowcase() {
  const [activeMessage, setActiveMessage] = useState<string>('Bấm vào các nút thủy tinh lỏng để trải nghiệm');

  return (
    <div
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #1A1614 0%, #251F1B 100%)',
        border: '1px solid rgba(194, 166, 132, 0.25)',
        borderRadius: '12px',
        padding: '48px 36px',
        margin: '64px auto 0 auto',
        maxWidth: '1080px',
        overflow: 'hidden',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
      }}
    >
      {/* Ambient background orbs to demonstrate real-time refraction */}
      <div
        style={{
          position: 'absolute',
          top: '-60px',
          right: '-60px',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(194, 166, 132, 0.25) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-80px',
          left: '10%',
          width: '340px',
          height: '340px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(230, 205, 175, 0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ textAlign: 'center', marginBottom: '36px', position: 'relative', zIndex: 2 }}>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.72rem',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'var(--color-accent-sand)',
            fontWeight: 600,
            marginBottom: '10px',
          }}
        >
          APPLE LIQUID GLASS JS • OPTICAL REFRACTION ENGINE
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)',
            color: '#FAF8F5',
            fontWeight: 500,
            margin: '0 0 12px 0',
            letterSpacing: '0.03em',
          }}
        >
          Trải Nghiệm{' '}
          <span style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--color-accent-gold)' }}>
            Liquid Glass
          </span>{' '}
          Khúc Xạ Thời Gian Thực
        </h3>

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.88rem',
            color: '#B8AFA6',
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          Tái tạo chính xác kiến trúc shader WebGL từ repo <code>dashersw/liquid-glass-js</code>: tính toán pháp tuyến
          bề mặt dạng viên con nhộng (Pill), hình tròn hoàn hảo (Circle), viền phản xạ ánh sáng (Rim light),
          Gaussian blur và hệ thống khúc xạ đa tầng (Nested Glass).
        </p>
      </div>

      {/* Interactive Demonstration Rows matching original repo */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Row 1: Hello Liquid Glass Badge (Pill) */}
        <div>
          <LiquidGlassButton
            shape="pill"
            size={15}
            text="🍎 SÖL LIQUID GLASS UI"
            onClick={() => setActiveMessage('Đã click: 🍎 SÖL LIQUID GLASS UI (Capsule Shape)')}
            style={{
              padding: '12px 28px',
              letterSpacing: '0.12em',
              fontWeight: 600,
            }}
          />
        </div>

        {/* Row 2: Circular Media Glass Controls */}
        <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
          <LiquidGlassButton
            shape="circle"
            size={16}
            onClick={() => setActiveMessage('Đã kích hoạt: ▶ Bắt đầu buổi tập Audio Ambient')}
            title="Play Audio"
          >
            ▶
          </LiquidGlassButton>

          <LiquidGlassButton
            shape="circle"
            size={16}
            onClick={() => setActiveMessage('Đã kích hoạt: ⏺ Ghi nhận chỉ số AI Biometrics')}
            title="Record Biometrics"
          >
            ⏺
          </LiquidGlassButton>

          <LiquidGlassButton
            shape="circle"
            size={16}
            onClick={() => setActiveMessage('Đã kích hoạt: ⏭ Chuyển bài tập tiếp theo')}
            title="Next Movement"
          >
            ⏭
          </LiquidGlassButton>
        </div>

        {/* Row 3: Nested Glass Container with Child Buttons */}
        <div>
          <LiquidGlassContainer
            shape="pill"
            borderRadius={28}
            tintOpacity={0.25}
            style={{ padding: '10px 18px', gap: '12px' }}
          >
            <LiquidGlassButton
              shape="pill"
              size={13}
              text="Khám Phá Sanctuary"
              onClick={() => setActiveMessage('Đã chọn nút con lồng trong khay kính: Khám Phá Sanctuary (Nested Glass)')}
            />
            <LiquidGlassButton
              shape="circle"
              size={15}
              onClick={() => setActiveMessage('Đã chọn nút tròn con lồng trong khay kính: ✓ Xác nhận')}
            >
              ✓
            </LiquidGlassButton>
          </LiquidGlassContainer>
        </div>

        {/* Status display */}
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.8rem',
            color: '#C2A684',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(194, 166, 132, 0.2)',
            padding: '8px 18px',
            borderRadius: '20px',
            marginTop: '8px',
          }}
        >
          {activeMessage}
        </div>
      </div>
    </div>
  );
}

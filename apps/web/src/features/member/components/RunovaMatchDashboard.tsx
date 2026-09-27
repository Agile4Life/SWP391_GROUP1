import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LANDING_IMAGES } from '../../landing/assets/images';
import { LiquidGlassContainer } from '../../../shared/liquid-glass/LiquidGlassContainer';

export function RunovaMatchDashboard() {
  const [matchType, setMatchType] = useState<'singles' | 'doubles' | 'mixed'>('singles');

  return (
    <div
      style={{
        padding: '28px 36px',
        maxWidth: '1440px',
        margin: '0 auto',
        fontFamily: 'var(--font-sans)',
      }}
    >
      {/* Top Welcome Header Bar (Matching Image 1) */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '26px',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: 'Barlow Condensed',
              fontSize: '2.6rem',
              fontWeight: 900,
              color: '#111A14',
              margin: '0 0 4px 0',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
            }}
          >
            Welcome Sasha!
          </h1>
          <div
            style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: '#627267',
              textTransform: 'uppercase',
            }}
          >
            TODAY IS SATURDAY, 11TH NOVEMBER 2025 • PRO ATHLETE PORTAL
          </div>
        </div>

        {/* Follower Stats & Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              backgroundColor: '#FFFFFF',
              padding: '10px 20px',
              borderRadius: '9999px',
              border: '1px solid rgba(22, 56, 44, 0.08)',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#111A14',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>👥</span>
              <span>198K <span style={{ color: '#7A857E', fontWeight: 500 }}>FOLLOWERS</span></span>
            </div>
            <div style={{ width: '1px', height: '16px', backgroundColor: '#E0DDD5' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>👥</span>
              <span>550 <span style={{ color: '#7A857E', fontWeight: 500 }}>FOLLOWING</span></span>
            </div>
            <div style={{ width: '1px', height: '16px', backgroundColor: '#E0DDD5' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>▶️</span>
              <span>1069 <span style={{ color: '#7A857E', fontWeight: 500 }}>VIDEOS</span></span>
            </div>
          </div>

          {/* Quick Utility Icon Buttons */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {['🔍', '💬', '❤️', '🔔'].map((icon, i) => (
              <button
                key={i}
                type="button"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  border: '1px solid rgba(22, 56, 44, 0.1)',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                }}
              >
                {icon}
              </button>
            ))}

            <Link
              to="/member/classes"
              className="runova-cta-btn"
              style={{
                backgroundColor: '#16382C',
                color: '#D4E95C',
                padding: '8px 18px',
                fontSize: '0.82rem',
              }}
            >
              + Đặt Sân / Lớp
            </Link>
          </div>
        </div>
      </div>

      {/* Main 3-Column Match Hub Layout (Matching Image 1) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '320px 1.45fr 360px',
          gap: '24px',
          alignItems: 'start',
        }}
      >
        {/* Column 1: Player Profile Card & Upgrade Promo (Left) */}
        <div style={{ display: 'grid', gap: '20px' }}>
          {/* Main Athlete Photo Card with Glass Info Overlay */}
          <div
            className="runova-squircle-card"
            style={{
              position: 'relative',
              height: '480px',
              borderRadius: '26px',
            }}
          >
            <img
              src={LANDING_IMAGES.runovaPlayerSasha}
              alt="Sasha Indigo"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />

            {/* Frosted Glass Player Details Overlay (Liquid Glass) */}
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
              }}
            >
              <LiquidGlassContainer
                shape="rounded"
                borderRadius={20}
                tintOpacity={0.35}
                style={{
                  padding: '16px 18px',
                  border: '1px solid rgba(255, 255, 255, 0.35)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=60&q=80"
                    alt="Avatar"
                    style={{ width: '38px', height: '38px', borderRadius: '10px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#FFFFFF' }}>
                      Sasha Indigo
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'rgba(255, 255, 255, 0.8)', letterSpacing: '0.08em' }}>
                      🌐 INDONESIA / VIETNAM
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.92)' }}>
                  <div>Age : <strong>27</strong></div>
                  <div>Birth : <strong>24 - 02 - 1993</strong></div>
                  <div>Sex : <strong>Women</strong></div>
                  <div>WTA/UTR : <strong style={{ color: '#D4E95C' }}>10.0 Pro</strong></div>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '10px', fontSize: '0.9rem' }}>
                  <span>📷</span>
                  <span>🎵</span>
                </div>
              </LiquidGlassContainer>
            </div>
          </div>

          {/* Floating Upgrade to Pro Card */}
          <div
            className="runova-squircle-card"
            style={{
              padding: '20px',
              borderRadius: '22px',
              background: 'linear-gradient(135deg, #16382C 0%, #11281F 100%)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #D4E95C 0%, #8FA322 100%)',
                boxShadow: '0 0 20px rgba(212, 233, 92, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                flexShrink: 0,
              }}
            >
              🎾
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'Barlow Condensed',
                  fontSize: '1.05rem',
                  fontWeight: 900,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: '#D4E95C',
                }}
              >
                UPGRADE TO PRO
              </div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.75)', marginTop: '2px' }}>
                FOR MORE MATCH &amp; SENSOR FEATURES
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: My Next Match & Latest Scores (Center) */}
        <div style={{ display: 'grid', gap: '20px' }}>
          {/* Card: My Next Match */}
          <div
            className="runova-squircle-card"
            style={{
              padding: '24px 28px',
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h2
                style={{
                  fontFamily: 'Barlow Condensed',
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  color: '#111A14',
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                }}
              >
                My Next Match
              </h2>
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#627267',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>📅</span>
                <span>18 JANUARY 2026</span>
              </div>
            </div>

            {/* Split Matchup Cards: Naomi Brown VS Sasha Indigo */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '16px', alignItems: 'center' }}>
              {/* Player 1 */}
              <div
                style={{
                  position: 'relative',
                  height: '160px',
                  borderRadius: '18px',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={LANDING_IMAGES.runovaPlayerNaomi}
                  alt="Naomi Brown"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '12px 14px',
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
                    color: '#FFFFFF',
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>Naomi Brown</div>
                  <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.8)' }}>🌐 JAPAN</div>
                </div>
              </div>

              {/* VS Indicator */}
              <div
                style={{
                  fontFamily: 'Barlow Condensed',
                  fontSize: '1.2rem',
                  fontWeight: 900,
                  color: '#7A857E',
                  padding: '8px',
                }}
              >
                VS
              </div>

              {/* Player 2 */}
              <div
                style={{
                  position: 'relative',
                  height: '160px',
                  borderRadius: '18px',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={LANDING_IMAGES.runovaPlayerSasha}
                  alt="Sasha Indigo"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '12px 14px',
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
                    color: '#FFFFFF',
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>Sasha Indigo</div>
                  <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.8)' }}>🌐 INDONESIA</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card: Latest Scores */}
          <div
            className="runova-squircle-card"
            style={{
              padding: '24px 28px',
              backgroundColor: '#CCD5B8',
              borderRadius: '24px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2
                style={{
                  fontFamily: 'Barlow Condensed',
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  color: '#111A14',
                  margin: 0,
                  textTransform: 'uppercase',
                }}
              >
                Latest Scores
              </h2>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16382C', cursor: 'pointer' }}>
                VIEW MORE →
              </span>
            </div>

            {/* Pill Tabs: Singles / Doubles / Mixed Doubles */}
            <div
              style={{
                display: 'inline-flex',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                padding: '4px',
                borderRadius: '9999px',
                gap: '4px',
                marginBottom: '16px',
              }}
            >
              {(['singles', 'doubles', 'mixed'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setMatchType(t)}
                  style={{
                    padding: '6px 16px',
                    borderRadius: '9999px',
                    border: 'none',
                    backgroundColor: matchType === t ? '#111A14' : 'transparent',
                    color: matchType === t ? '#FFFFFF' : '#334138',
                    fontWeight: 700,
                    fontSize: '0.72rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Match info row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: 700, color: '#16382C' }}>
                <span>🎾</span>
                <span>WTA - SINGLES: Australia Open, hard</span>
              </div>
              <span style={{ fontSize: '1rem', color: '#16382C' }}>⭐</span>
            </div>

            {/* Set Scores with Match thumbnails and Win badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Player set"
                  style={{ width: '80px', height: '90px', borderRadius: '14px', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'relative',
                    width: '80px',
                    height: '90px',
                    borderRadius: '14px',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
                    alt="Player set"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '6px',
                      right: '6px',
                      backgroundColor: '#52794D',
                      color: '#FFFFFF',
                      fontSize: '0.62rem',
                      fontWeight: 800,
                      padding: '2px 6px',
                      borderRadius: '4px',
                    }}
                  >
                    Win
                  </div>
                </div>
              </div>

              {/* Set Score digits */}
              <div style={{ display: 'grid', gap: '4px' }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.6)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800 }}>
                  Set 1: 8 - 3
                </div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.6)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800 }}>
                  Set 2: 8 - 3
                </div>
                <div style={{ backgroundColor: '#16382C', color: '#D4E95C', padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 800 }}>
                  Final: 2 - 0 (WON)
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Breakdown Cards: Singles, Doubles, Mixed Wins */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
            <div
              className="runova-squircle-card"
              style={{
                position: 'relative',
                height: '110px',
                borderRadius: '18px',
                overflow: 'hidden',
              }}
            >
              <img
                src={LANDING_IMAGES.runovaRacketCourt}
                alt="Singles"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(17, 35, 25, 0.72)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#FFFFFF',
                }}
              >
                <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D4E95C' }}>
                  ✦ SINGLES ✦
                </div>
                <div style={{ fontFamily: 'Barlow Condensed', fontSize: '1.6rem', fontWeight: 900 }}>
                  86 Wins
                </div>
              </div>
            </div>

            <div
              className="runova-squircle-card"
              style={{
                position: 'relative',
                height: '110px',
                borderRadius: '18px',
                overflow: 'hidden',
              }}
            >
              <img
                src={LANDING_IMAGES.runovaProduct1}
                alt="Doubles"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(17, 35, 25, 0.72)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#FFFFFF',
                }}
              >
                <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D4E95C' }}>
                  ✦ DOUBLES ✦
                </div>
                <div style={{ fontFamily: 'Barlow Condensed', fontSize: '1.6rem', fontWeight: 900 }}>
                  100 Wins
                </div>
              </div>
            </div>

            <div
              className="runova-squircle-card"
              style={{
                position: 'relative',
                height: '110px',
                borderRadius: '18px',
                overflow: 'hidden',
              }}
            >
              <img
                src={LANDING_IMAGES.runovaAboutClay}
                alt="Mixed Doubles"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(17, 35, 25, 0.72)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#FFFFFF',
                }}
              >
                <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D4E95C' }}>
                  ✦ MIXED DOUBLES ✦
                </div>
                <div style={{ fontFamily: 'Barlow Condensed', fontSize: '1.6rem', fontWeight: 900 }}>
                  38 Wins
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Big Statistic Card (Right) */}
        <div>
          <div
            className="runova-squircle-card"
            style={{
              position: 'relative',
              height: '420px',
              borderRadius: '26px',
              overflow: 'hidden',
              marginBottom: '20px',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=800&q=80"
              alt="Tennis court win"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(17, 35, 25, 0.88) 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '32px 28px',
                color: '#FFFFFF',
              }}
            >
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#D4E95C',
                  marginBottom: '8px',
                }}
              >
                STATISTIC OVERALL
              </div>
              <div
                style={{
                  fontFamily: 'Barlow Condensed',
                  fontSize: '3.6rem',
                  fontWeight: 900,
                  lineHeight: 0.95,
                  marginBottom: '6px',
                }}
              >
                224 Wins
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'rgba(255, 255, 255, 0.85)' }}>
                [80% Win Rate]
              </div>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div
            className="runova-squircle-card"
            style={{
              padding: '20px 24px',
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
            }}
          >
            <div style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '12px', color: '#111A14' }}>
              ⚡ TIỆN ÍCH THI ĐẤU NHANH
            </div>
            <div style={{ display: 'grid', gap: '8px' }}>
              <Link
                to="/member/classes"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 14px',
                  backgroundColor: '#F5F3EC',
                  borderRadius: '10px',
                  color: '#111A14',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                }}
              >
                <span>🎾 Đặt Sân Thi Đấu Hôm Nay</span>
                <span>→</span>
              </Link>

              <Link
                to="/member/card"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 14px',
                  backgroundColor: '#F5F3EC',
                  borderRadius: '10px',
                  color: '#111A14',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                }}
              >
                <span>📱 Thẻ Hội Viên &amp; Mã QR Sân</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

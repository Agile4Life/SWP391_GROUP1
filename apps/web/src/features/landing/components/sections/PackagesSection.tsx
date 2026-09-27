import { useTheme } from '../../../../shared/context/ThemeContext';
import { ArrowButton } from '../ArrowButton';

interface PackagesSectionProps {
  onSelectPlan?: (planName: string) => void;
}

export function PackagesSection({ onSelectPlan }: PackagesSectionProps) {
  const { theme } = useTheme();

  const solTiers = [
    {
      id: 'essential',
      name: 'THE ESSENTIAL',
      duration: '30 DAYS SUBSCRIPTION',
      price: '2.800.000',
      unit: 'VNĐ / THÁNG',
      description: 'Ideal for focused independent practitioners seeking world-class architectural facilities.',
      perks: [
        'Full access to Olympic Strength & Cardio Sanctuary',
        'Hydrotherapy lap pool & Finnish sauna access',
        '2 Group Class credits per week (Yoga/Spinning)',
        'Dynamic QR Pass on mobile client',
      ],
      featured: false,
    },
    {
      id: 'sanctuary',
      name: 'THE SANCTUARY',
      duration: '90 DAYS SUBSCRIPTION',
      price: '7.500.000',
      unit: 'VNĐ / QUÝ',
      description: 'Our most comprehensive residency for holistic conditioning and athletic restoration.',
      perks: [
        'Unlimited access to all studios & disciplines',
        'Reformer Pilates & Boxing Ring access',
        'Monthly InBody 770 AI Biometric Calibration',
        '4 Private 1-on-1 Master Coach sessions',
        'Complimentary laundry & artisanal locker valet',
      ],
      featured: true,
    },
    {
      id: 'sovereign',
      name: 'THE SOVEREIGN',
      duration: '365 DAYS ANNUAL RESIDENCY',
      price: '26.000.000',
      unit: 'VNĐ / NĂM',
      description: 'The pinnacle of private athletic refinement with dedicated concierge and unlimited guest privileges.',
      perks: [
        'Unrestricted VIP access across all facilities 24/7',
        'Dedicated Personal Performance Coach & Dietitian',
        'Unlimited Cryotherapy & Contrast Hydrotherapy circuits',
        'Priority studio waitlist allocation (SCMS VIP queue)',
        'Executive private dressing suite with organic amenities',
      ],
      featured: false,
    },
  ];

  const runovaTiers = [
    {
      id: 'club-player',
      name: 'CLUB PLAYER',
      duration: '30 DAYS COURT PASS',
      price: '1.800.000',
      unit: 'VNĐ / THÁNG',
      description: 'Phù hợp cho người chơi thể thao phong trào luyện tập cầu lông và thể lực hàng ngày.',
      perks: [
        'Đặt sân Cầu lông & Padel giờ tiêu chuẩn (6h - 17h)',
        'Sử dụng phòng gym thể lực và đường chạy điền kinh',
        'Mã QR điện tử qua cổng turnstile tự động',
        'Tham gia bảng xếp hạng giao lưu nội bộ hàng tuần',
      ],
      featured: false,
    },
    {
      id: 'championship-pro',
      name: 'CHAMPIONSHIP PRO',
      duration: '90 DAYS TOURNAMENT TIER',
      price: '4.900.000',
      unit: 'VNĐ / QUÝ',
      description: 'Gói thẻ phổ biến nhất cho vận động viên thi đấu bán chuyên Tennis, Cầu lông & Padel.',
      perks: [
        'Toàn quyền đặt sân mọi khung giờ vàng (kể cả 17h - 22h)',
        'Sử dụng hệ thống cảm biến AI đo lực và phân tích cú đánh',
        '4 buổi huấn luyện 1-kèm-1 với HLV chuyên nghiệp',
        'Ưu tiên giữ chỗ sân và tự động xếp hàng chờ (Waitlist VIP)',
        'Miễn phí mượn vợt thi đấu cao cấp tại quầy lễ tân',
      ],
      featured: true,
    },
    {
      id: 'tournament-master',
      name: 'TOURNAMENT MASTER',
      duration: '365 DAYS ANNUAL PASS',
      price: '16.500.000',
      unit: 'VNĐ / NĂM',
      description: 'Đặc quyền thi đấu đỉnh cao dành cho hội viên danh dự và vận động viên chuyên nghiệp.',
      perks: [
        'Quyền sử dụng 24/7 toàn bộ cụm sân bãi & phòng hồi phục',
        'Tặng bộ túi vợt và trang phục Runova Pro Edition',
        'Bảo dưỡng và đan cước vợt miễn phí không giới hạn',
        'Đặc quyền dẫn theo 1 khách mời tập luyện mỗi tuần',
        'Vé tham gia toàn bộ các giải đấu mở rộng do trung tâm tổ chức',
      ],
      featured: false,
    },
  ];

  const tiers = theme === 'runova' ? runovaTiers : solTiers;

  const handleSelect = (planName: string) => {
    if (onSelectPlan) {
      onSelectPlan(planName);
    }
  };

  if (theme === 'runova') {
    return (
      <section id="packages" className="sol-section" style={{ backgroundColor: '#FAF8F5', padding: '100px 48px' }}>
        <div className="sol-section-inner" style={{ maxWidth: '1240px' }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px auto' }}>
            <div
              className="runova-pill-badge"
              style={{
                backgroundColor: '#EAE6DF',
                color: '#16382C',
                marginBottom: '16px',
              }}
            >
              MEMBERSHIP TIERS
            </div>
            <h2
              style={{
                fontFamily: 'Barlow Condensed',
                fontSize: 'clamp(2.8rem, 5.5vw, 4.6rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                color: '#111A14',
                lineHeight: 1,
                letterSpacing: '0.01em',
                marginBottom: '18px',
              }}
            >
              SELECT YOUR <span style={{ color: '#16382C' }}>COURT PASS</span>
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.92rem',
                color: '#4F5E54',
                lineHeight: 1.6,
                margin: '0 auto',
              }}
            >
              Linh hoạt theo nhu cầu tập luyện và thi đấu. Đồng bộ tức thì với hệ thống kiểm soát lượt và mã QR SCMS.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
              gap: '28px',
            }}
          >
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className="runova-squircle-card"
                style={{
                  padding: '36px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '26px',
                  border: tier.featured ? '2px solid #16382C' : '1px solid rgba(22, 56, 44, 0.1)',
                  backgroundColor: tier.featured ? '#FFFFFF' : '#FAF8F5',
                  position: 'relative',
                  transform: tier.featured ? 'scale(1.02)' : 'none',
                  boxShadow: tier.featured
                    ? '0 20px 40px -10px rgba(22, 56, 44, 0.15)'
                    : '0 4px 15px rgba(0, 0, 0, 0.02)',
                }}
              >
                {tier.featured && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-14px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: '#D4E95C',
                      color: '#111A14',
                      padding: '4px 16px',
                      borderRadius: '9999px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      boxShadow: '0 4px 12px rgba(212, 233, 92, 0.4)',
                    }}
                  >
                    MOST POPULAR • KHUYÊN DÙNG
                  </div>
                )}

                <div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      color: tier.featured ? '#16382C' : '#7A857E',
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                    }}
                  >
                    {tier.duration}
                  </div>

                  <h3
                    style={{
                      fontFamily: 'Barlow Condensed',
                      fontSize: '2rem',
                      fontWeight: 900,
                      color: '#111A14',
                      margin: '0 0 16px 0',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {tier.name}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '18px' }}>
                    <span
                      style={{
                        fontFamily: 'Barlow Condensed',
                        fontSize: '2.6rem',
                        fontWeight: 900,
                        color: tier.featured ? '#16382C' : '#111A14',
                      }}
                    >
                      {tier.price}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#627267', fontWeight: 600 }}>{tier.unit}</span>
                  </div>

                  <p
                    style={{
                      fontSize: '0.84rem',
                      color: '#4F5E54',
                      lineHeight: 1.55,
                      marginBottom: '28px',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    {tier.description}
                  </p>

                  <div
                    style={{
                      borderTop: '1px solid rgba(22, 56, 44, 0.08)',
                      paddingTop: '20px',
                      marginBottom: '32px',
                    }}
                  >
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#111A14', marginBottom: '14px', textTransform: 'uppercase' }}>
                      Đặc quyền gói tập:
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '18px', display: 'grid', gap: '10px' }}>
                      {tier.perks.map((perk, i) => (
                        <li key={i} style={{ fontSize: '0.82rem', color: '#4F5E54', lineHeight: 1.5 }}>
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelect(tier.name)}
                  className="runova-cta-btn"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    backgroundColor: tier.featured ? '#16382C' : '#FFFFFF',
                    color: tier.featured ? '#D4E95C' : '#111A14',
                    border: tier.featured ? 'none' : '1px solid rgba(22, 56, 44, 0.2)',
                  }}
                >
                  <span>Chọn Gói {tier.name}</span>
                  <span style={{ fontSize: '1rem' }}>↗</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="packages" className="sol-section" style={{ backgroundColor: '#F6F2EC' }}>
      <div className="sol-section-inner">
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 20px auto' }}>
          <div className="editorial-category">MEMBERSHIP CURATIONS / 04</div>
          <h2 className="editorial-headline" style={{ marginBottom: '16px' }}>
            CURATED{' '}
            <span className="editorial-flourish" style={{ fontStyle: 'italic', fontWeight: 300 }}>
              Residencies
            </span>
          </h2>
          <p className="editorial-body" style={{ margin: '0 auto' }}>
            Membership at Söl Wellness Sanctuary is capped to preserve an uncrowded atmosphere of serenity and focus.
          </p>
        </div>

        <div className="pricing-grid">
          {tiers.map((tier) => (
            <div key={tier.id} className={`pricing-card ${tier.featured ? 'featured' : ''}`}>
              {tier.featured && <div className="pricing-badge">MOST REVERED</div>}

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.2em',
                    color: 'var(--color-text-muted)',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                    fontWeight: 600,
                  }}
                >
                  {tier.duration}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.9rem',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    margin: '0 0 16px 0',
                    color: 'var(--color-text-main)',
                  }}
                >
                  {tier.name}
                </h3>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '20px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '2.4rem',
                      fontWeight: 500,
                      color: 'var(--color-text-main)',
                    }}
                  >
                    {tier.price}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.75rem',
                      color: 'var(--color-text-muted)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {tier.unit}
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.86rem',
                    lineHeight: 1.65,
                    color: 'var(--color-text-muted)',
                    marginBottom: '28px',
                    fontWeight: 300,
                  }}
                >
                  {tier.description}
                </p>

                <div
                  style={{
                    borderTop: '1px solid var(--color-border-subtle)',
                    paddingTop: '20px',
                    marginBottom: '36px',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-muted)',
                      marginBottom: '14px',
                      fontWeight: 600,
                    }}
                  >
                    INCLUDED PRIVILEGES
                  </div>
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'grid',
                      gap: '10px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.82rem',
                      color: 'var(--color-text-main)',
                      lineHeight: 1.5,
                    }}
                  >
                    {tier.perks.map((p, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <span style={{ color: 'var(--color-accent-gold)' }}>✦</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <ArrowButton
                  label="SELECT RESIDENCY"
                  href="#contact"
                  onClick={() => handleSelect(tier.name)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

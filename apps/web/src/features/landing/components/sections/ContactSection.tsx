import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../../shared/context/ThemeContext';
import { ArrowButton } from '../ArrowButton';
import { InfiniteMarquee } from '../InfiniteMarquee';

interface ContactSectionProps {
  initialPlan?: string;
}

export function ContactSection({ initialPlan }: ContactSectionProps) {
  const { theme } = useTheme();

  const isRunova = theme === 'runova';
  const defaultPlan = initialPlan || (isRunova ? 'CHAMPIONSHIP PRO' : 'THE SANCTUARY');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    plan: defaultPlan,
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Vui lòng điền Họ tên và Số điện thoại để ban quản trị liên hệ.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section
      id="contact"
      style={{
        backgroundColor: isRunova ? '#EFECE6' : '#FAF8F5',
        paddingTop: '110px',
        transition: 'background-color 0.3s ease',
      }}
    >
      <div className="sol-section-inner" style={{ padding: '0 64px 80px 64px', boxSizing: 'border-box' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.25fr',
            gap: '64px',
            alignItems: 'start',
          }}
        >
          {/* Left Narrative */}
          <div>
            <div
              className="editorial-category"
              style={{
                color: isRunova ? '#16382C' : undefined,
                fontWeight: isRunova ? 700 : undefined,
              }}
            >
              {isRunova
                ? 'CONTACT SPORTVERSE / COURT BOOKING & MEMBERSHIP / 06'
                : 'CONTACT US / RESIDENCY INQUIRIES / 05'}
            </div>

            <h2
              className="editorial-headline"
              style={{
                fontSize: 'clamp(2.6rem, 4.4vw, 3.8rem)',
                lineHeight: 1.08,
                marginBottom: '26px',
                fontFamily: isRunova ? 'var(--font-heading)' : undefined,
                color: isRunova ? '#111A14' : undefined,
              }}
            >
              {isRunova ? (
                <>
                  JOIN THE{' '}
                  <span style={{ color: '#16382C', fontWeight: 800 }}>RUNOVA ARENA</span>
                </>
              ) : (
                <>
                  LET&apos;S BEGIN A{' '}
                  <span className="editorial-flourish" style={{ fontStyle: 'italic', fontWeight: 300 }}>
                    Conversation
                  </span>
                </>
              )}
            </h2>

            <p className="editorial-body" style={{ maxWidth: '460px' }}>
              {isRunova
                ? 'Khám phá hệ sinh thái cụm sân thi đấu chuẩn quốc tế Tennis, Cầu lông, Padel và nền tảng huấn luyện AI phân tích chuyển động. Ban quản trị cụm sân Runova sẽ liên hệ kích hoạt thẻ Court Pass tức thì.'
                : 'Tell us more about your athletic goals, personal routine, and wellness aspirations. Our concierge receptionists and master coaches will guide you through the next steps with intention and care.'}
            </p>

            <div
              style={{
                borderLeft: isRunova ? '3px solid #D4E95C' : '2px solid var(--color-accent-sand)',
                paddingLeft: '20px',
                marginTop: '36px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.82rem',
                color: isRunova ? '#16382C' : 'var(--color-text-muted)',
                lineHeight: 1.6,
                fontWeight: isRunova ? 600 : 400,
              }}
            >
              {isRunova ? (
                <>
                  <div>✦ Kích hoạt thẻ Court Pass QR &amp; cấp mã đặt sân trực tuyến tức thì</div>
                  <div style={{ marginTop: '4px' }}>
                    ✦ Đo đạc chỉ số tốc độ vung vợt &amp; tư vấn giáo án phân tích AI
                  </div>
                </>
              ) : (
                <>
                  <div>✦ Tiếp nhận đăng ký hội viên mới &amp; phát hành mã QR thẻ tập</div>
                  <div style={{ marginTop: '4px' }}>✦ Tư vấn giáo án cá nhân hóa kết hợp đo chỉ số InBody</div>
                </>
              )}
            </div>
          </div>

          {/* Right Form */}
          <div>
            {isSubmitted ? (
              <div
                style={{
                  padding: '44px 36px',
                  backgroundColor: isRunova ? '#FFFFFF' : 'var(--color-bg-warm)',
                  borderRadius: isRunova ? '24px' : '2px',
                  border: isRunova ? '2px solid #16382C' : '1px solid var(--color-accent-sand)',
                  textAlign: 'center',
                  boxShadow: isRunova ? '0 12px 35px rgba(22, 56, 44, 0.08)' : undefined,
                }}
              >
                <div
                  style={{
                    fontFamily: isRunova ? 'var(--font-heading)' : 'var(--font-serif)',
                    fontSize: '2rem',
                    marginBottom: '12px',
                    color: isRunova ? '#16382C' : undefined,
                    fontWeight: isRunova ? 800 : 400,
                  }}
                >
                  Yêu Cầu Đã Được Tiếp Nhận
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.92rem',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.7,
                  }}
                >
                  {isRunova ? (
                    <>
                      Cảm ơn <strong>{formData.name}</strong>. Ban quản trị cụm sân Runova Athletic Club sẽ liên hệ
                      qua số điện thoại <strong>{formData.phone}</strong> trong vòng 15 phút để xác nhận gói{' '}
                      <strong>{formData.plan}</strong> và cấp mã thẻ Court Pass trải nghiệm sân.
                    </>
                  ) : (
                    <>
                      Cảm ơn <strong>{formData.name}</strong>. Bộ phận lễ tân của Söl Wellness Sanctuary sẽ liên hệ
                      qua số điện thoại <strong>{formData.phone}</strong> trong vòng 30 phút để xác nhận gói{' '}
                      <strong>{formData.plan}</strong> và kích hoạt thẻ trải nghiệm.
                    </>
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  style={{
                    marginTop: '20px',
                    background: isRunova ? '#16382C' : 'none',
                    color: isRunova ? '#D4E95C' : 'var(--color-text-main)',
                    border: isRunova ? 'none' : '1px solid var(--color-text-main)',
                    padding: isRunova ? '12px 28px' : '9px 22px',
                    borderRadius: isRunova ? '9999px' : '2px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    fontWeight: 700,
                  }}
                >
                  Gửi yêu cầu khác
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: 'grid',
                  gap: '22px',
                  backgroundColor: isRunova ? '#FFFFFF' : 'transparent',
                  padding: isRunova ? '36px' : '0',
                  borderRadius: isRunova ? '24px' : '0',
                  boxShadow: isRunova ? '0 12px 35px rgba(22, 56, 44, 0.06)' : 'none',
                  border: isRunova ? '1px solid rgba(22, 56, 44, 0.1)' : 'none',
                }}
              >
                <div className="minimal-input-group">
                  <input
                    type="text"
                    required
                    placeholder="Họ và Tên *"
                    className="minimal-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div className="minimal-input-group">
                    <input
                      type="tel"
                      required
                      placeholder="Số Điện Thoại *"
                      className="minimal-input"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="minimal-input-group">
                    <input
                      type="email"
                      placeholder="Địa Chỉ Email"
                      className="minimal-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="minimal-input-group">
                  <label
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-muted)',
                      display: 'block',
                      marginBottom: '6px',
                    }}
                  >
                    {isRunova ? 'Gói Court Pass Quan Tâm:' : 'Gói Hội Viên Quan Tâm:'}
                  </label>
                  <select
                    className="minimal-input"
                    value={formData.plan}
                    onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                    style={{ cursor: 'pointer' }}
                  >
                    {isRunova ? (
                      <>
                        <option value="CLUB PLAYER">Club Player (1 Tháng — 1.800.000đ)</option>
                        <option value="CHAMPIONSHIP PRO">
                          Championship Pro (3 Tháng — 4.900.000đ — Khuyên dùng)
                        </option>
                        <option value="TOURNAMENT MASTER">Tournament Master (1 Năm VIP — 16.500.000đ)</option>
                      </>
                    ) : (
                      <>
                        <option value="THE ESSENTIAL">The Essential (1 Tháng — 2.800.000đ)</option>
                        <option value="THE SANCTUARY">The Sanctuary (3 Tháng — 7.500.000đ — Khuyên dùng)</option>
                        <option value="THE SOVEREIGN">The Sovereign (1 Năm VIP — 26.000.000đ)</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <textarea
                    rows={3}
                    placeholder={
                      isRunova
                        ? 'Bộ môn đăng ký (Tennis / Cầu lông / Padel) hoặc khung giờ muốn đặt sân...'
                        : 'Mục tiêu thể lực hoặc lời nhắn dành cho Huấn luyện viên trưởng...'
                    }
                    className="minimal-textarea"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <div style={{ marginTop: '8px' }}>
                  {isRunova ? (
                    <button
                      type="submit"
                      disabled={isLoading}
                      style={{
                        background: '#16382C',
                        color: '#D4E95C',
                        border: 'none',
                        borderRadius: '9999px',
                        padding: '16px 36px',
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        letterSpacing: '0.12em',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px',
                        transition: 'all 0.25s ease',
                      }}
                    >
                      <span>{isLoading ? 'ĐANG GỬI THÔNG TIN...' : 'GỬI ĐĂNG KÝ SÂN ĐẤU'}</span>
                      <span aria-hidden="true">→</span>
                    </button>
                  ) : (
                    <ArrowButton
                      label={isLoading ? 'SENDING INQUIRY...' : 'SEND INQUIRY'}
                      onClick={() => {}}
                    />
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 4-Column Footer */}
      <footer
        className="aura-footer-bar"
        style={{
          backgroundColor: isRunova ? '#0F261E' : undefined,
          color: isRunova ? '#EFECE6' : undefined,
          borderTop: isRunova ? '1px solid rgba(212, 233, 92, 0.2)' : undefined,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: isRunova ? 'var(--font-heading)' : 'var(--font-serif)',
              fontSize: isRunova ? '1.5rem' : '1.3rem',
              letterSpacing: isRunova ? '0.08em' : '0.2em',
              fontWeight: 800,
              marginBottom: '10px',
              color: isRunova ? '#D4E95C' : undefined,
            }}
          >
            {isRunova ? 'RUNOVA ATHLETIC CLUB' : 'SÖL WELLNESS SANCTUARY'}
          </div>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem',
              lineHeight: 1.65,
              color: isRunova ? '#A3B8AC' : 'var(--color-text-muted)',
              maxWidth: '280px',
              margin: 0,
            }}
          >
            {isRunova
              ? 'Sports Center Management System (SCMS) • High-Performance Court & Sportverse. Nền tảng quản lý cụm sân và huấn luyện thể thao tích hợp công nghệ AI.'
              : 'Sports Center Management System (SCMS). Nền tảng thể thao đa năng tích hợp AI coaching & quản trị vận hành thông minh.'}
          </p>
        </div>

        <div>
          <div
            className="footer-col-title"
            style={{ color: isRunova ? '#D4E95C' : undefined }}
          >
            KHÁM PHÁ
          </div>
          <ul className="footer-nav-list">
            <li className="footer-nav-item">
              <a href="#about" style={{ color: isRunova ? '#EFECE6' : undefined }}>
                {isRunova ? 'Về Runova Arena' : 'Về Chúng Tôi'}
              </a>
            </li>
            <li className="footer-nav-item">
              <a href="#disciplines" style={{ color: isRunova ? '#EFECE6' : undefined }}>
                {isRunova ? 'Cụm Sân Thi Đấu' : 'Các Bộ Môn'}
              </a>
            </li>
            <li className="footer-nav-item">
              <a href="#intelligence" style={{ color: isRunova ? '#EFECE6' : undefined }}>
                {isRunova ? 'Công Nghệ AI Sportverse' : 'Công Nghệ AI'}
              </a>
            </li>
            <li className="footer-nav-item">
              <a href="#packages" style={{ color: isRunova ? '#EFECE6' : undefined }}>
                {isRunova ? 'Bảng Giá Court Pass' : 'Bảng Giá Gói Tập'}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div
            className="footer-col-title"
            style={{ color: isRunova ? '#D4E95C' : undefined }}
          >
            CỔNG TRUY CẬP (PORTAL)
          </div>
          <ul className="footer-nav-list">
            <li className="footer-nav-item">
              <Link to="/login" title="Đăng nhập Hội viên" style={{ color: isRunova ? '#EFECE6' : undefined }}>
                Cổng Hội Viên (Member)
              </Link>
            </li>
            <li className="footer-nav-item">
              <Link to="/login" title="Đăng nhập Huấn luyện viên" style={{ color: isRunova ? '#EFECE6' : undefined }}>
                Cổng Coach &amp; Điểm danh
              </Link>
            </li>
            <li className="footer-nav-item">
              <Link to="/login" title="Đăng nhập Lễ tân" style={{ color: isRunova ? '#EFECE6' : undefined }}>
                Cổng Lễ Tân &amp; Check-in
              </Link>
            </li>
            <li className="footer-nav-item">
              <Link to="/login" title="Đăng nhập Quản lý" style={{ color: isRunova ? '#EFECE6' : undefined }}>
                Cổng Quản Trị Trung Tâm
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div
            className="footer-col-title"
            style={{ color: isRunova ? '#D4E95C' : undefined }}
          >
            LIÊN HỆ TRUNG TÂM
          </div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem',
              color: isRunova ? '#A3B8AC' : 'var(--color-text-muted)',
              lineHeight: 1.8,
            }}
          >
            <div>
              {isRunova
                ? 'Cụm Sân Thể Thao Runova Arena, 120 Hai Bà Trưng, Q.1, TP. Hồ Chí Minh'
                : 'Tòa nhà Landmark Sports, 120 Hai Bà Trưng, Q.1, TP. Hồ Chí Minh'}
            </div>
            <div style={{ marginTop: '6px' }}>
              <strong style={{ color: isRunova ? '#EFECE6' : undefined }}>Hotline:</strong> 1900 6868
            </div>
            <div>
              <strong style={{ color: isRunova ? '#EFECE6' : undefined }}>Email:</strong>{' '}
              {isRunova ? 'arena@runova-sports.vn' : 'concierge@sol-wellness.vn'}
            </div>
            <div
              style={{
                fontSize: '0.72rem',
                marginTop: '6px',
                color: isRunova ? '#7E9185' : '#9E958C',
              }}
            >
              Giờ hoạt động: 06:00 – 22:00 hàng ngày
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Marquee Band */}
      <InfiniteMarquee
        phrases={
          isRunova
            ? [
                'RUNOVA ATHLETIC CLUB',
                'HIGH-PERFORMANCE COURT',
                'CHAMPIONSHIP ARENA',
                'SMART AI TRAINING',
                'COURT PASS READY',
              ]
            : [
                'SÖL WELLNESS SANCTUARY',
                'ELEVATE YOUR STRENGTH',
                'MINDFUL MOVEMENT',
                'JOIN THE RESIDENCY',
                'DISCIPLINE & MASTERY',
              ]
        }
      />
    </section>
  );
}


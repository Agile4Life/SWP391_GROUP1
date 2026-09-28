import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowButton } from '../ArrowButton';
import { InfiniteMarquee } from '../InfiniteMarquee';

interface ContactSectionProps {
  initialPlan?: string;
}

export function ContactSection({ initialPlan }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    plan: initialPlan || 'THE SANCTUARY',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Vui lòng điền Họ tên và Số điện thoại để chuyên viên tư vấn liên hệ.');
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
      className="sol-section sol-fullscreen-card"
      style={{
        backgroundColor: '#FAF8F5',
        padding: 'clamp(72px, 11vh, 92px) clamp(20px, 4vw, 60px) 0 clamp(20px, 4vw, 60px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div className="sol-section-inner" style={{ padding: '0', boxSizing: 'border-box' }}>
        <div className="contact-responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: 'clamp(20px, 3vw, 44px)', alignItems: 'start' }}>
          {/* Left Narrative */}
          <div>
            <div className="editorial-category" style={{ marginBottom: '6px' }}>
              CONTACT US / RESIDENCY INQUIRIES / 05
            </div>

            <h2
              className="editorial-headline"
              style={{
                fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
                lineHeight: 1.1,
                marginBottom: '14px',
              }}
            >
              LET&apos;S BEGIN A{' '}
              <span className="editorial-flourish" style={{ fontStyle: 'italic', fontWeight: 300 }}>
                Conversation
              </span>
            </h2>

            <p
              className="editorial-body"
              style={{
                maxWidth: '460px',
                fontSize: 'clamp(0.8rem, 1vw, 0.88rem)',
                lineHeight: 1.55,
                margin: 0,
              }}
            >
              Tell us more about your athletic goals, personal routine, and wellness aspirations. Our concierge
              receptionists and master coaches will guide you through the next steps with intention and care.
            </p>

            <div
              className="contact-narrative-extra"
              style={{
                borderLeft: '2px solid var(--color-accent-sand)',
                paddingLeft: '16px',
                marginTop: 'clamp(12px, 2vh, 22px)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.76rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.5,
              }}
            >
              <div>✦ Tiếp nhận đăng ký hội viên mới &amp; phát hành mã QR thẻ tập</div>
              <div style={{ marginTop: '4px' }}>✦ Tư vấn giáo án cá nhân hóa kết hợp đo chỉ số InBody</div>
            </div>
          </div>

          {/* Right Form */}
          <div>
            {isSubmitted ? (
              <div
                style={{
                  padding: '44px 36px',
                  backgroundColor: 'var(--color-bg-warm)',
                  borderRadius: '2px',
                  border: '1px solid var(--color-accent-sand)',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '12px' }}>
                  Yêu Cầu Đã Được Tiếp Nhận
                </div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
                  Cảm ơn <strong>{formData.name}</strong>. Bộ phận lễ tân của Söl Wellness Sanctuary sẽ liên hệ qua số điện thoại{' '}
                  <strong>{formData.phone}</strong> trong vòng 30 phút để xác nhận gói <strong>{formData.plan}</strong> và kích hoạt thẻ trải nghiệm.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  style={{
                    marginTop: '20px',
                    background: 'none',
                    border: '1px solid var(--color-text-main)',
                    padding: '9px 22px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                >
                  Gửi yêu cầu khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'clamp(10px, 1.5vh, 16px)' }}>
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

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
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
                      fontSize: '0.68rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-muted)',
                      display: 'block',
                      marginBottom: '4px',
                    }}
                  >
                    Gói Hội Viên Quan Tâm:
                  </label>
                  <select
                    className="minimal-input"
                    value={formData.plan}
                    onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="THE ESSENTIAL">The Essential (1 Tháng — 2.800.000đ)</option>
                    <option value="THE SANCTUARY">The Sanctuary (3 Tháng — 7.500.000đ — Khuyên dùng)</option>
                    <option value="THE SOVEREIGN">The Sovereign (1 Năm VIP — 26.000.000đ)</option>
                  </select>
                </div>

                <div>
                  <textarea
                    rows={2}
                    placeholder="Mục tiêu thể lực hoặc lời nhắn dành cho Huấn luyện viên trưởng..."
                    className="minimal-textarea"
                    style={{ minHeight: '52px', padding: '8px' }}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <div style={{ marginTop: '4px' }}>
                  <ArrowButton
                    label={isLoading ? 'SENDING INQUIRY...' : 'SEND INQUIRY'}
                    onClick={() => {}}
                  />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 4-Column Luxury Footer */}
      <footer
        className="aura-footer-bar"
        style={{
          padding: 'clamp(10px, 1.4vh, 18px) clamp(16px, 2.5vw, 40px)',
          gap: 'clamp(14px, 2vw, 24px)',
          marginTop: 'auto',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.05rem',
              letterSpacing: '0.15em',
              fontWeight: 600,
              marginBottom: '4px',
            }}
          >
            SÖL WELLNESS SANCTUARY
          </div>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              lineHeight: 1.5,
              color: 'var(--color-text-muted)',
              maxWidth: '260px',
              margin: 0,
            }}
          >
            Sports Center Management System (SCMS). Nền tảng thể thao đa năng tích hợp AI coaching &amp; quản trị vận hành
            thông minh.
          </p>
        </div>

        <div>
          <div className="footer-col-title" style={{ marginBottom: '8px', fontSize: '0.66rem' }}>KHÁM PHÁ</div>
          <ul className="footer-nav-list" style={{ gap: '6px' }}>
            <li className="footer-nav-item"><a href="#about" style={{ fontSize: '0.72rem' }}>Về Chúng Tôi</a></li>
            <li className="footer-nav-item"><a href="#disciplines" style={{ fontSize: '0.72rem' }}>Các Bộ Môn</a></li>
            <li className="footer-nav-item"><a href="#intelligence" style={{ fontSize: '0.72rem' }}>Công Nghệ AI</a></li>
            <li className="footer-nav-item"><a href="#packages" style={{ fontSize: '0.72rem' }}>Bảng Giá Gói Tập</a></li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title" style={{ marginBottom: '8px', fontSize: '0.66rem' }}>CỔNG TRUY CẬP (PORTAL)</div>
          <ul className="footer-nav-list" style={{ gap: '6px' }}>
            <li className="footer-nav-item">
              <Link to="/login" title="Đăng nhập Hội viên" style={{ fontSize: '0.72rem' }}>Cổng Hội Viên (Member)</Link>
            </li>
            <li className="footer-nav-item">
              <Link to="/login" title="Đăng nhập Huấn luyện viên" style={{ fontSize: '0.72rem' }}>Cổng Coach &amp; Điểm danh</Link>
            </li>
            <li className="footer-nav-item">
              <Link to="/login" title="Đăng nhập Lễ tân" style={{ fontSize: '0.72rem' }}>Cổng Lễ Tân &amp; Check-in</Link>
            </li>
            <li className="footer-nav-item">
              <Link to="/login" title="Đăng nhập Quản lý" style={{ fontSize: '0.72rem' }}>Cổng Quản Trị Trung Tâm</Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title" style={{ marginBottom: '8px', fontSize: '0.66rem' }}>LIÊN HỆ TRUNG TÂM</div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.6,
            }}
          >
            <div>Landmark Sports, 120 Hai Bà Trưng, Q.1, TP.HCM</div>
            <div style={{ marginTop: '2px' }}><strong>Hotline:</strong> 1900 6868</div>
            <div><strong>Email:</strong> concierge@sol-wellness.vn</div>
          </div>
        </div>
      </footer>

      {/* Mobile-only compact footer bar */}
      <div className="contact-mobile-footer">
        <div><strong>SÖL WELLNESS</strong> · 1900 6868</div>
        <Link to="/login" style={{ color: 'var(--color-text-main)', textDecoration: 'none', fontWeight: 600 }}>CỔNG SCMS →</Link>
      </div>

      {/* Bottom Marquee Band */}
      <InfiniteMarquee
        phrases={[
          'SÖL WELLNESS SANCTUARY',
          'ELEVATE YOUR STRENGTH',
          'MINDFUL MOVEMENT',
          'JOIN THE RESIDENCY',
          'DISCIPLINE & MASTERY',
        ]}
      />
    </section>
  );
}

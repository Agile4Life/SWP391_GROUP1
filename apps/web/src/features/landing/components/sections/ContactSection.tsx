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
    <section id="contact" style={{ backgroundColor: '#FAF8F5', paddingTop: '110px' }}>
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
            <div className="editorial-category">CONTACT US / RESIDENCY INQUIRIES / 05</div>

            <h2
              className="editorial-headline"
              style={{
                fontSize: 'clamp(2.6rem, 4.4vw, 3.8rem)',
                lineHeight: 1.08,
                marginBottom: '26px',
              }}
            >
              LET&apos;S BEGIN A{' '}
              <span className="editorial-flourish" style={{ fontStyle: 'italic', fontWeight: 300 }}>
                Conversation
              </span>
            </h2>

            <p className="editorial-body" style={{ maxWidth: '460px' }}>
              Tell us more about your athletic goals, personal routine, and wellness aspirations. Our concierge
              receptionists and master coaches will guide you through the next steps with intention and care.
            </p>

            <div
              style={{
                borderLeft: '2px solid var(--color-accent-sand)',
                paddingLeft: '20px',
                marginTop: '36px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.82rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.6,
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
              <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '22px' }}>
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
                    rows={3}
                    placeholder="Mục tiêu thể lực hoặc lời nhắn dành cho Huấn luyện viên trưởng..."
                    className="minimal-textarea"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <div style={{ marginTop: '8px' }}>
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
      <footer className="aura-footer-bar">
        <div>
          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.3rem',
              letterSpacing: '0.2em',
              fontWeight: 600,
              marginBottom: '10px',
            }}
          >
            SÖL WELLNESS SANCTUARY
          </div>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem',
              lineHeight: 1.65,
              color: 'var(--color-text-muted)',
              maxWidth: '280px',
              margin: 0,
            }}
          >
            Sports Center Management System (SCMS). Nền tảng thể thao đa năng tích hợp AI coaching &amp; quản trị vận hành
            thông minh.
          </p>
        </div>

        <div>
          <div className="footer-col-title">KHÁM PHÁ</div>
          <ul className="footer-nav-list">
            <li className="footer-nav-item"><a href="#about">Về Chúng Tôi</a></li>
            <li className="footer-nav-item"><a href="#disciplines">Các Bộ Môn</a></li>
            <li className="footer-nav-item"><a href="#intelligence">Công Nghệ AI</a></li>
            <li className="footer-nav-item"><a href="#packages">Bảng Giá Gói Tập</a></li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title">CỔNG TRUY CẬP (PORTAL)</div>
          <ul className="footer-nav-list">
            <li className="footer-nav-item">
              <Link to="/login" title="Đăng nhập Hội viên">Cổng Hội Viên (Member)</Link>
            </li>
            <li className="footer-nav-item">
              <Link to="/login" title="Đăng nhập Huấn luyện viên">Cổng Coach &amp; Điểm danh</Link>
            </li>
            <li className="footer-nav-item">
              <Link to="/login" title="Đăng nhập Lễ tân">Cổng Lễ Tân &amp; Check-in</Link>
            </li>
            <li className="footer-nav-item">
              <Link to="/login" title="Đăng nhập Quản lý">Cổng Quản Trị Trung Tâm</Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title">LIÊN HỆ TRUNG TÂM</div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.8,
            }}
          >
            <div>Tòa nhà Landmark Sports, 120 Hai Bà Trưng, Q.1, TP. Hồ Chí Minh</div>
            <div style={{ marginTop: '6px' }}><strong>Hotline:</strong> 1900 6868</div>
            <div><strong>Email:</strong> concierge@sol-wellness.vn</div>
            <div style={{ fontSize: '0.72rem', marginTop: '6px', color: '#9E958C' }}>
              Giờ hoạt động: 06:00 – 22:00 hàng ngày
            </div>
          </div>
        </div>
      </footer>

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

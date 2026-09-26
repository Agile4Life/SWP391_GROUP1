import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowButton } from '../ArrowButton';
import { InfiniteMarquee } from '../InfiniteMarquee';

export function ContactSlide() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    goal: 'General Wellness',
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
    <div
      className="aura-slide-canvas contact-slide-wrapper"
      style={{
        backgroundColor: '#FAF8F5',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Form Section Matching Reference Image 5 */}
      <div
        style={{
          padding: '80px 64px 40px 64px',
          maxWidth: '1240px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '56px',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Headline and Narrative */}
          <div>
            <div className="editorial-category stagger-1">CONTACT US / MEMBERSHIP</div>

            <h2
              className="editorial-headline stagger-2"
              style={{
                fontSize: 'clamp(2.4rem, 4.2vw, 3.6rem)',
                lineHeight: 1.08,
                marginBottom: '24px',
              }}
            >
              LET&apos;S BEGIN A{' '}
              <span className="editorial-flourish" style={{ fontStyle: 'italic', fontWeight: 300 }}>
                Conversation
              </span>
            </h2>

            <p className="editorial-body stagger-3">
              Tell us more about your athletic goals, personal routine, and wellness aspirations. Our concierge
              receptionists and master coaches will guide you through the next steps with intention and care.
            </p>
          </div>

          {/* Right Column: Minimal Underline Form */}
          <div className="stagger-3">
            {isSubmitted ? (
              <div
                style={{
                  padding: '36px',
                  backgroundColor: 'var(--color-bg-warm)',
                  borderRadius: '2px',
                  border: '1px solid var(--color-accent-sand)',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '12px' }}>
                  Yêu Cầu Đã Được Tiếp Nhận
                </div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  Cảm ơn <strong>{formData.name}</strong>. Bộ phận lễ tân của Aura Athletics sẽ liên hệ qua số điện thoại{' '}
                  <strong>{formData.phone}</strong> trong vòng 30 phút để kích hoạt thẻ trải nghiệm.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  style={{
                    marginTop: '18px',
                    background: 'none',
                    border: '1px solid var(--color-text-main)',
                    padding: '8px 18px',
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
              <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
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

                <div>
                  <textarea
                    rows={3}
                    placeholder="Mục tiêu tập luyện hoặc lời nhắn dành cho Huấn luyện viên..."
                    className="minimal-textarea"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '12px' }}>
                  <ArrowButton
                    label={isLoading ? 'SENDING REQUEST...' : 'SEND REQUEST'}
                    onClick={() => {}}
                  />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Half: 4-Column Footer Bar & Infinite Marquee Ticker */}
      <div>
        <footer className="aura-footer-bar">
          <div>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                letterSpacing: '0.2em',
                fontWeight: 600,
                marginBottom: '10px',
              }}
            >
              AURA ATHLETICS
            </div>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                lineHeight: 1.6,
                color: 'var(--color-text-muted)',
                maxWidth: '260px',
                margin: 0,
              }}
            >
              Sports Center Management System (SCMS). Nền tảng thể thao đa năng tích hợp AI coaching & quản trị vận hành
              thông minh.
            </p>
          </div>

          <div>
            <div className="footer-col-title">KHÁM PHÁ</div>
            <ul className="footer-nav-list">
              <li className="footer-nav-item"><a href="#about">Về Chúng Tôi</a></li>
              <li className="footer-nav-item"><a href="#disciplines">Các Bộ Môn</a></li>
              <li className="footer-nav-item"><a href="#packages">Bảng Giá Gói Tập</a></li>
              <li className="footer-nav-item"><a href="#schedule">Lịch Lớp Học</a></li>
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
              <div><strong>Email:</strong> concierge@aura-athletics.vn</div>
              <div style={{ fontSize: '0.72rem', marginTop: '6px', color: '#9E958C' }}>
                Giờ hoạt động: 06:00 – 22:00 hàng ngày
              </div>
            </div>
          </div>
        </footer>

        {/* Marquee Ticker at the absolute bottom */}
        <InfiniteMarquee
          phrases={[
            'GET IN TOUCH',
            'ELEVATE YOUR STRENGTH',
            'MINDFUL MOVEMENT',
            'JOIN THE SANCTUARY',
            'DISCIPLINE & MASTERY',
          ]}
        />
      </div>
    </div>
  );
}

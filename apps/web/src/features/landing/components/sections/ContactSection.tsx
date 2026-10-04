import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowButton } from '../ArrowButton';
import { SiteFooter } from '../SiteFooter';
import { toast } from '../../../../shared/ui/toast';
import { getCurrentUser, homePath } from '../../../../shared/api/client';

interface ContactSectionProps {
  initialPlan?: string;
}

export function ContactSection({ initialPlan }: ContactSectionProps) {
  const currentUser = getCurrentUser();
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
      toast('Vui lòng điền Họ tên và Số điện thoại để chuyên viên tư vấn liên hệ.', 'error');
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
      <div
        className="sol-section-inner"
        style={{
          maxWidth: '740px',
          width: '100%',
          margin: 'auto',
          padding: '0 clamp(16px, 3vw, 32px)',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2
          className="editorial-headline"
          style={{
            fontSize: 'clamp(2rem, 3.6vw, 3.2rem)',
            lineHeight: 1.15,
            margin: '0 0 clamp(20px, 3vh, 32px) 0',
            textAlign: 'center',
            letterSpacing: '0.02em',
          }}
        >
          LET&apos;S BEGIN A{' '}
          <span className="editorial-flourish" style={{ fontStyle: 'italic', fontWeight: 300 }}>
            Conversation
          </span>
        </h2>

        <div style={{ width: '100%' }}>
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
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'clamp(14px, 2vh, 20px)' }}>
              <div className="minimal-input-group" style={{ marginBottom: 0 }}>
                <input
                  type="text"
                  required
                  placeholder="Họ và Tên *"
                  className="minimal-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(16px, 2.5vw, 24px)' }}>
                <div className="minimal-input-group" style={{ marginBottom: 0 }}>
                  <input
                    type="tel"
                    required
                    placeholder="Số Điện Thoại *"
                    className="minimal-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="minimal-input-group" style={{ marginBottom: 0 }}>
                  <input
                    type="email"
                    placeholder="Địa Chỉ Email"
                    className="minimal-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="minimal-input-group" style={{ marginBottom: 0 }}>
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
                  rows={3}
                  placeholder="Mục tiêu thể lực hoặc lời nhắn dành cho Huấn luyện viên trưởng..."
                  className="minimal-textarea"
                  style={{ minHeight: '68px', padding: '12px', boxSizing: 'border-box' }}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'clamp(6px, 1.2vh, 14px)' }}>
                <button
                  type="submit"
                  disabled={isLoading}
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                >
                  <ArrowButton
                    label={isLoading ? 'SENDING INQUIRY...' : 'SEND INQUIRY'}
                    onClick={() => {}}
                  />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <SiteFooter />

      {/* Mobile-only compact footer bar */}
      <div className="contact-mobile-footer">
        <div><strong>SÖL WELLNESS</strong> · 1900 6868</div>
        <Link
          to={currentUser ? homePath(currentUser.role) : '/login'}
          viewTransition
          style={{ color: 'var(--color-text-main)', textDecoration: 'none', fontWeight: 600 }}
        >
          {currentUser ? `VÀO HỆ THỐNG (${currentUser.name}) →` : 'ĐĂNG NHẬP →'}
        </Link>
      </div>
    </section>
  );
}

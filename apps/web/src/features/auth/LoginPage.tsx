import { Link } from 'react-router-dom';
import { LuxuryLoginForm } from './LuxuryLoginForm';
import { InfiniteMarquee } from '../landing/components/InfiniteMarquee';
import { LANDING_IMAGES } from '../landing/assets/images';

export function LoginPage() {
  return (
    <div className="sol-page-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      {/* Top Header Matching Main Website Navbar */}
      <header
        className="sol-fixed-navbar scrolled"
        style={{
          position: 'sticky',
          top: 0,
          background: 'rgba(250, 248, 245, 0.96)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--color-border-subtle)',
          padding: '0 56px',
        }}
      >
        <Link to="/" className="aura-brand-mark">
          SÖL WELLNESS SANCTUARY
        </Link>

        <nav className="aura-nav-links" aria-label="Portal Header Navigation">
          <Link to="/#about" className="aura-nav-link">
            PHILOSOPHY
          </Link>
          <Link to="/#disciplines" className="aura-nav-link">
            DISCIPLINES
          </Link>
          <Link to="/#packages" className="aura-nav-link">
            MEMBERSHIP
          </Link>
          <Link to="/#contact" className="aura-nav-link">
            CONTACT
          </Link>
        </nav>

        <Link
          to="/"
          className="aura-portal-btn"
        >
          ← VỀ TRANG CHỦ
        </Link>
      </header>

      {/* Main Login Stage Matching Editorial Split Layout */}
      <main style={{ padding: '80px 64px', maxWidth: '1280px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.05fr 1fr',
            gap: '64px',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Atmospheric Architectural Imagery & Philosophy */}
          <div>
            <div className="editorial-category">PORTAL ACCESS / RESIDENCY GATEWAY</div>

            <h1
              className="editorial-headline"
              style={{
                fontSize: 'clamp(2.6rem, 4.4vw, 4rem)',
                lineHeight: 1.05,
                marginBottom: '24px',
              }}
            >
              ENTER THE{' '}
              <span className="editorial-flourish" style={{ fontStyle: 'italic', fontWeight: 300 }}>
                Sanctuary
              </span>
            </h1>

            <p className="editorial-body" style={{ maxWidth: '480px', marginBottom: '32px' }}>
              Cổng quản trị tập trung Sports Center Management System (SCMS). Nền tảng số hóa đồng bộ phục vụ công tác
              vận hành, huấn luyện và đối soát thẻ thành viên dựa trên phân quyền vai trò (RBAC) nghiêm ngặt.
            </p>

            {/* Architectural Visual Plinth */}
            <div
              className="image-card-wrapper"
              style={{
                height: '320px',
                borderRadius: '4px',
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.08)',
                marginBottom: '28px',
              }}
            >
              <img
                src={LANDING_IMAGES.aboutPrimary}
                alt="Sanctuary Movement Architecture"
                loading="lazy"
              />
            </div>

            <div
              style={{
                display: 'grid',
                gap: '12px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.84rem',
                color: '#6A635D',
              }}
            >
              <div>✦ <strong>Hội viên:</strong> Quản lý lịch tập, đặt chỗ lớp Reformer/Boxing, thẻ QR ra vào cổng.</div>
              <div>✦ <strong>Lễ tân &amp; Thu phí:</strong> Tra cứu hội viên tức thì, tiếp nhận thanh toán POS/VietQR.</div>
              <div>✦ <strong>Huấn luyện viên:</strong> Điểm danh buổi dạy, đánh giá thể trạng và nhận gợi ý giáo án AI.</div>
              <div>✦ <strong>Quản lý:</strong> Thiết lập danh mục bộ môn/phòng, phân quyền và theo dõi báo cáo doanh thu.</div>
            </div>
          </div>

          {/* Right Column: Quiet Luxury Login Form */}
          <div>
            <LuxuryLoginForm />
          </div>
        </div>
      </main>

      {/* Footer Matching Main Website */}
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
              <li className="footer-nav-item"><Link to="/#about">Về Chúng Tôi</Link></li>
              <li className="footer-nav-item"><Link to="/#disciplines">Các Bộ Môn</Link></li>
              <li className="footer-nav-item"><Link to="/#intelligence">Công Nghệ AI</Link></li>
              <li className="footer-nav-item"><Link to="/#packages">Bảng Giá Gói Tập</Link></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">CỔNG TRUY CẬP (PORTAL)</div>
            <ul className="footer-nav-list">
              <li className="footer-nav-item">
                <Link to="/member/dashboard" title="Đăng nhập Hội viên">Cổng Hội Viên (Member)</Link>
              </li>
              <li className="footer-nav-item">
                <Link to="/staff/attendance" title="Đăng nhập Huấn luyện viên">Cổng Coach &amp; Điểm danh</Link>
              </li>
              <li className="footer-nav-item">
                <Link to="/staff/reception" title="Đăng nhập Lễ tân">Cổng Lễ Tân &amp; Check-in</Link>
              </li>
              <li className="footer-nav-item">
                <Link to="/manager/reports" title="Đăng nhập Quản lý">Cổng Quản Trị Trung Tâm</Link>
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

        {/* Marquee Banner */}
        <InfiniteMarquee
          phrases={[
            'SÖL WELLNESS SANCTUARY',
            'PORTAL AUTHENTICATION',
            'ELEVATE YOUR STRENGTH',
            'MINDFUL MOVEMENT',
            'DISCIPLINE & MASTERY',
          ]}
        />
      </div>
    </div>
  );
}
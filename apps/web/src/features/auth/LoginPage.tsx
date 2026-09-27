import { Link } from 'react-router-dom';
import { useTheme } from '../../shared/context/ThemeContext';
import { LuxuryLoginForm } from './LuxuryLoginForm';
import { InfiniteMarquee } from '../landing/components/InfiniteMarquee';
import { LANDING_IMAGES } from '../landing/assets/images';

export function LoginPage() {
  const { theme } = useTheme();
  const isRunova = theme === 'runova';

  return (
    <div
      className="sol-page-root"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: isRunova ? '#EFECE6' : '#FAF8F5',
      }}
    >
      {/* Top Header Matching Main Website Navbar */}
      <header
        className="sol-fixed-navbar scrolled"
        style={{
          position: 'sticky',
          top: 0,
          background: isRunova ? 'rgba(239, 236, 230, 0.96)' : 'rgba(250, 248, 245, 0.96)',
          backdropFilter: 'blur(16px)',
          borderBottom: isRunova ? '1px solid rgba(22, 56, 44, 0.12)' : '1px solid var(--color-border-subtle)',
          padding: '0 56px',
        }}
      >
        <Link
          to="/"
          className="aura-brand-mark"
          style={{
            fontFamily: isRunova ? 'var(--font-heading)' : undefined,
            color: isRunova ? '#16382C' : undefined,
            fontWeight: isRunova ? 800 : undefined,
          }}
        >
          {isRunova ? 'RUNOVA ATHLETIC CLUB' : 'SÖL WELLNESS SANCTUARY'}
        </Link>

        <nav className="aura-nav-links" aria-label="Portal Header Navigation">
          <Link to="/#about" className="aura-nav-link">
            {isRunova ? 'ABOUT' : 'PHILOSOPHY'}
          </Link>
          <Link to="/#disciplines" className="aura-nav-link">
            {isRunova ? 'COURTS' : 'DISCIPLINES'}
          </Link>
          <Link to="/#packages" className="aura-nav-link">
            {isRunova ? 'COURT PASS' : 'MEMBERSHIP'}
          </Link>
          <Link to="/#contact" className="aura-nav-link">
            CONTACT
          </Link>
        </nav>

        <Link
          to="/"
          className="aura-portal-btn"
          style={{
            backgroundColor: isRunova ? '#16382C' : undefined,
            color: isRunova ? '#D4E95C' : undefined,
            borderRadius: isRunova ? '9999px' : undefined,
          }}
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
            <div
              className="editorial-category"
              style={{
                color: isRunova ? '#16382C' : undefined,
                fontWeight: isRunova ? 700 : undefined,
              }}
            >
              {isRunova ? 'PORTAL ACCESS / RUNOVA SPORTVERSE GATEWAY' : 'PORTAL ACCESS / RESIDENCY GATEWAY'}
            </div>

            <h1
              className="editorial-headline"
              style={{
                fontSize: 'clamp(2.6rem, 4.4vw, 4rem)',
                lineHeight: 1.05,
                marginBottom: '24px',
                fontFamily: isRunova ? 'var(--font-heading)' : undefined,
                color: isRunova ? '#111A14' : undefined,
              }}
            >
              {isRunova ? (
                <>
                  ENTER THE{' '}
                  <span style={{ color: '#16382C', fontWeight: 800 }}>RUNOVA ARENA</span>
                </>
              ) : (
                <>
                  ENTER THE{' '}
                  <span className="editorial-flourish" style={{ fontStyle: 'italic', fontWeight: 300 }}>
                    Sanctuary
                  </span>
                </>
              )}
            </h1>

            <p className="editorial-body" style={{ maxWidth: '480px', marginBottom: '32px' }}>
              {isRunova
                ? 'Cổng quản trị tập trung Sports Center Management System (SCMS). Nền tảng số hóa đồng bộ phục vụ vận hành cụm sân thể thao, huấn luyện AI phân tích chuyển động và đối soát thẻ thành viên.'
                : 'Cổng quản trị tập trung Sports Center Management System (SCMS). Nền tảng số hóa đồng bộ phục vụ công tác vận hành, huấn luyện và đối soát thẻ thành viên dựa trên phân quyền vai trò (RBAC) nghiêm ngặt.'}
            </p>

            {/* Visual Plinth */}
            <div
              className="image-card-wrapper"
              style={{
                height: '320px',
                borderRadius: isRunova ? '24px' : '4px',
                boxShadow: isRunova
                  ? '0 16px 40px rgba(22, 56, 44, 0.12)'
                  : '0 16px 40px rgba(0, 0, 0, 0.08)',
                marginBottom: '28px',
                border: isRunova ? '1px solid rgba(22, 56, 44, 0.1)' : 'none',
              }}
            >
              <img
                src={isRunova ? LANDING_IMAGES.runovaRacketCourt : LANDING_IMAGES.aboutPrimary}
                alt={isRunova ? 'Runova Court Performance' : 'Sanctuary Movement Architecture'}
                loading="lazy"
              />
            </div>

            <div
              style={{
                display: 'grid',
                gap: '12px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.84rem',
                color: isRunova ? '#2B4A3D' : '#6A635D',
              }}
            >
              {isRunova ? (
                <>
                  <div>✦ <strong>Hội viên:</strong> Quản lý lịch sân Tennis/Padel/Cầu lông, giải đấu, thẻ QR Court Pass ra vào cụm sân.</div>
                  <div>✦ <strong>Lễ tân &amp; Thu phí:</strong> Quản lý check-in lượt sân, tiếp nhận thanh toán POS/VietQR và mở turnstile.</div>
                  <div>✦ <strong>Huấn luyện viên:</strong> Điểm danh ca dạy sân, theo dõi chỉ số AI đo lực và tối ưu hóa bài tập.</div>
                  <div>✦ <strong>Quản lý:</strong> Cấu hình cụm sân, phân quyền ban điều hành và theo dõi doanh thu tổng thể.</div>
                </>
              ) : (
                <>
                  <div>✦ <strong>Hội viên:</strong> Quản lý lịch tập, đặt chỗ lớp Reformer/Boxing, thẻ QR ra vào cổng.</div>
                  <div>✦ <strong>Lễ tân &amp; Thu phí:</strong> Tra cứu hội viên tức thì, tiếp nhận thanh toán POS/VietQR.</div>
                  <div>✦ <strong>Huấn luyện viên:</strong> Điểm danh buổi dạy, đánh giá thể trạng và nhận gợi ý giáo án AI.</div>
                  <div>✦ <strong>Quản lý:</strong> Thiết lập danh mục bộ môn/phòng, phân quyền và theo dõi báo cáo doanh thu.</div>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Login Form */}
          <div>
            <LuxuryLoginForm />
          </div>
        </div>
      </main>

      {/* Footer Matching Main Website */}
      <div>
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
                fontSize: isRunova ? '1.5rem' : '1.25rem',
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
                <Link to="/#about" style={{ color: isRunova ? '#EFECE6' : undefined }}>
                  {isRunova ? 'Về Runova Arena' : 'Về Chúng Tôi'}
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link to="/#disciplines" style={{ color: isRunova ? '#EFECE6' : undefined }}>
                  {isRunova ? 'Cụm Sân Thi Đấu' : 'Các Bộ Môn'}
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link to="/#intelligence" style={{ color: isRunova ? '#EFECE6' : undefined }}>
                  {isRunova ? 'Công Nghệ AI Sportverse' : 'Công Nghệ AI'}
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link to="/#packages" style={{ color: isRunova ? '#EFECE6' : undefined }}>
                  {isRunova ? 'Bảng Giá Court Pass' : 'Bảng Giá Gói Tập'}
                </Link>
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
                <Link to="/member/dashboard" title="Đăng nhập Hội viên" style={{ color: isRunova ? '#EFECE6' : undefined }}>
                  Cổng Hội Viên (Member)
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link to="/staff/attendance" title="Đăng nhập Huấn luyện viên" style={{ color: isRunova ? '#EFECE6' : undefined }}>
                  Cổng Coach &amp; Điểm danh
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link to="/staff/reception" title="Đăng nhập Lễ tân" style={{ color: isRunova ? '#EFECE6' : undefined }}>
                  Cổng Lễ Tân &amp; Check-in
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link to="/manager/reports" title="Đăng nhập Quản lý" style={{ color: isRunova ? '#EFECE6' : undefined }}>
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

        {/* Marquee Banner */}
        <InfiniteMarquee
          phrases={
            isRunova
              ? [
                  'RUNOVA ATHLETIC CLUB',
                  'PORTAL AUTHENTICATION',
                  'HIGH-PERFORMANCE COURT',
                  'COURT PASS ACCESS',
                  'AI SPORTVERSE',
                ]
              : [
                  'SÖL WELLNESS SANCTUARY',
                  'PORTAL AUTHENTICATION',
                  'ELEVATE YOUR STRENGTH',
                  'MINDFUL MOVEMENT',
                  'DISCIPLINE & MASTERY',
                ]
          }
        />
      </div>
    </div>
  );
}
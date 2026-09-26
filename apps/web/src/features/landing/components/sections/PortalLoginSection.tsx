import { LuxuryLoginForm } from '../../../auth/LuxuryLoginForm';

export function PortalLoginSection() {
  return (
    <section id="portal-login" className="sol-section" style={{ backgroundColor: '#F6F2EC' }}>
      <div className="sol-section-inner">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.15fr',
            gap: '64px',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Context & Editorial Copy */}
          <div>
            <div className="editorial-category">PORTAL ACCESS / 06</div>

            <h2
              className="editorial-headline"
              style={{
                fontSize: 'clamp(2.6rem, 4.4vw, 3.8rem)',
                lineHeight: 1.08,
                marginBottom: '26px',
              }}
            >
              ENTER THE{' '}
              <span className="editorial-flourish" style={{ fontStyle: 'italic', fontWeight: 300 }}>
                Sanctuary
              </span>
            </h2>

            <p className="editorial-body" style={{ maxWidth: '460px', marginBottom: '32px' }}>
              Cổng quản trị tập trung Sports Center Management System (SCMS). Nền tảng số hóa đồng bộ phục vụ công tác
              vận hành, huấn luyện và trải nghiệm hội viên dựa trên phân quyền vai trò (RBAC) nghiêm ngặt.
            </p>

            <div
              style={{
                display: 'grid',
                gap: '16px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                color: '#4A433D',
                lineHeight: 1.6,
              }}
            >
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--color-accent-gold)', fontSize: '1rem' }}>✦</span>
                <div>
                  <strong>Hội Viên (Member):</strong> Quản lý lịch tập, đặt chỗ lớp Reformer/Boxing, mã QR ra vào cổng turnstile và nhật ký InBody.
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--color-accent-gold)', fontSize: '1rem' }}>✦</span>
                <div>
                  <strong>Lễ Tân &amp; Thu Phí (Staff):</strong> Tra cứu hội viên tức thì, tiếp nhận thanh toán đa kênh POS/VietQR, kiểm soát cửa check-in.
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--color-accent-gold)', fontSize: '1rem' }}>✦</span>
                <div>
                  <strong>Huấn Luyện Viên (Coach):</strong> Điểm danh buổi dạy, đánh giá thể trạng học viên và nhận gợi ý giáo án cá nhân hóa từ AI.
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--color-accent-gold)', fontSize: '1rem' }}>✦</span>
                <div>
                  <strong>Ban Quản Lý (Manager):</strong> Thiết lập danh mục bộ môn/phòng, phân quyền bảo mật và theo dõi báo cáo doanh thu đa chiều.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Luxury Login Form */}
          <div>
            <LuxuryLoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}

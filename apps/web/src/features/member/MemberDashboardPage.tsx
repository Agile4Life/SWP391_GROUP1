import { Link } from 'react-router-dom';
import { CountUp } from '../../shared/ui/CountUp';
import { getCurrentUser } from '../../shared/api/client';
import { toast } from '../../shared/ui/toast';
import { PageHeader } from '../../shared/ui/PageHeader';

export function MemberDashboardPage() {
  const currentUser = getCurrentUser();
  const userName = currentUser?.name || 'Hội viên';

  const upcomingClasses = [
    {
      id: 1,
      name: 'Zenith Reformer Pilates',
      time: '17:30 - 18:30 Hôm nay',
      coach: 'Master Elena Vũ',
      room: 'Studio 01 (Level 2)',
      status: 'BOOKED',
    },
    {
      id: 2,
      name: 'Olympus Strength Conditioning',
      time: '08:00 - 09:30 Ngày mai',
      coach: 'Coach Minh Trí',
      room: 'Arena 02 (Level 1)',
      status: 'BOOKED',
    },
    {
      id: 3,
      name: 'Mindful Yin Yoga & Breathwork',
      time: '19:00 - 20:00 Thứ Sáu',
      coach: 'Master An Nhiên',
      room: 'Zen Garden Studio',
      status: 'WAITLIST #1',
    },
  ];

  return (
    <div className="portal-container">
      <PageHeader
        eyebrow="Hội viên · Tổng quan"
        title="Xin chào,"
        flourish={userName}
        subtitle="Theo dõi gói tập, lịch học và chỉ số thể chất của bạn trong một không gian duy nhất."
        actions={
          <>
            <Link to="/member/classes" className="btn-primary">
              + Đặt Lớp Mới
            </Link>
            <Link to="/member/card" className="btn-secondary">
              Xem Thẻ QR Cổng
            </Link>
          </>
        }
      />

      {/* Metric Cards Row */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-label">TRẠNG THÁI GÓI TẬP</div>
          <div className="metric-value" style={{ fontSize: '1.7rem', color: '#15803d' }}>
            <CountUp value="ACTIVE" />
          </div>
          <div className="metric-trend">Hạn dùng: 26/12/2026 (còn 42 ngày)</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">BUỔI TẬP TRONG THÁNG</div>
          <div className="metric-value">
            <CountUp value={18} />
          </div>
          <div className="metric-trend">↑ +4 buổi so với tháng trước</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">CHỈ SỐ THỂ CHẤT (BMI)</div>
          <div className="metric-value">
            <CountUp value={21.8} format={(v) => v.toFixed(1)} />
          </div>
          <div className="metric-trend">Cân nặng: 68.5 kg • Mỡ: 14.2%</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">ĐIỂM TÍCH LŨY</div>
          <div className="metric-value">
            <CountUp value={1450} format={(v) => Math.round(v).toLocaleString('vi-VN')} />
          </div>
          <div className="metric-trend">Đủ đổi 2 buổi Hydrotherapy</div>
        </div>
      </div>

      {/* Grid: Upcoming Classes & AI Biometric Coach Card */}
      <div className="grid-2">
        {/* Upcoming Classes */}
        <div className="portal-card">
          <div className="portal-card-header">
            <h2 className="portal-card-title">Lịch Tập Sắp Tới</h2>
            <Link to="/member/classes" style={{ fontSize: '0.8rem', color: '#8C7765', fontWeight: 600 }}>
              Xem toàn bộ lịch →
            </Link>
          </div>

          <div className="stack" style={{ gap: '14px' }}>
            {upcomingClasses.map((cls, index) => (
              <div
                key={cls.id}
                className="row-card row-in"
                style={{ ['--i' as string]: index } as React.CSSProperties}
              >
                <div>
                  <h3 className="row-card__title">{cls.name}</h3>
                  <div className="row-card__meta">
                    🕒 {cls.time} • 📍 {cls.room}
                    <br />
                    HLV phụ trách: {cls.coach}
                  </div>
                </div>

                <div>
                  {cls.status === 'BOOKED' ? (
                    <span className="badge badge-success">Đã Đặt Chỗ</span>
                  ) : (
                    <span className="badge badge-warning">Hàng Chờ #1</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Biometric Coach Recommendation Card */}
        <div className="portal-card portal-card--feature">
          <div className="portal-card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.2rem' }}>✨</span>
              <h2 className="portal-card-title">Gợi Ý Từ Trợ Lý AI Coaching</h2>
            </div>
          </div>

          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.88rem', color: '#4A433D', lineHeight: 1.65 }}>
            Dựa trên chỉ số hồi phục HRV (78ms) và lịch sử tập tạ cường độ cao hôm qua, cơ thể bạn đang ở trạng thái lý tưởng
            cho bài tập kéo giãn cơ sâu và ổn định trục cột sống.
          </p>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '6px',
              padding: '16px',
              border: '1px solid rgba(33, 28, 24, 0.08)',
              marginTop: '16px',
              marginBottom: '18px',
            }}
          >
            <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '8px' }}>
              🎯 Giáo án gợi ý cho buổi tập hôm nay:
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.8rem', color: '#6A635D', lineHeight: 1.7 }}>
              <li>15 phút Reformer Footwork &amp; Pelvic Curl phục hồi cơ đùi sau</li>
              <li>20 phút Foam Rolling cơ lưng trên &amp; giải phóng màng cơ bả vai</li>
              <li>10 phút xông hơi đá muối Himalaya tại tầng Mezzanine</li>
            </ul>
          </div>

          <button
            type="button"
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => toast('Đã đồng bộ giáo án sang Huấn luyện viên phụ trách của bạn!', 'success')}
          >
            Gửi Giáo Án Cho HLV Elena Phê Duyệt
          </button>
        </div>
      </div>
    </div>
  );
}

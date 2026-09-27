import { useState, useEffect } from 'react';
import { useTheme } from '../../shared/context/ThemeContext';

export function MemberCardPage() {
  const { theme } = useTheme();
  const isRunova = theme === 'runova';

  const [secondsLeft, setSecondsLeft] = useState(60);

  // Dynamic QR auto-refresh countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 1 ? prev - 1 : 60));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const checkinLogs = isRunova
    ? [
        { date: '26/09/2026', time: '07:15', gate: 'Gate A - Sân Tennis Arena 01', method: 'Court Pass QR', status: 'Hợp lệ' },
        { date: '24/09/2026', time: '17:42', gate: 'Gate B - Sân Padel Kính 02', method: 'Court Pass QR', status: 'Hợp lệ' },
        { date: '22/09/2026', time: '18:05', gate: 'Gate A - Sảnh Turnstile Cụm Sân', method: 'Court Pass QR', status: 'Hợp lệ' },
        { date: '20/09/2026', time: '08:30', gate: 'Gate C - Sân Cầu Lông VIP 03', method: 'Court Pass QR', status: 'Hợp lệ' },
      ]
    : [
        { date: '26/09/2026', time: '07:15', gate: 'Gate A - Sảnh Chính', method: 'Dynamic QR', status: 'Hợp lệ' },
        { date: '24/09/2026', time: '17:42', gate: 'Gate B - Thang Máy Tầng 2', method: 'Dynamic QR', status: 'Hợp lệ' },
        { date: '22/09/2026', time: '18:05', gate: 'Gate A - Sảnh Chính', method: 'Dynamic QR', status: 'Hợp lệ' },
        { date: '20/09/2026', time: '08:30', gate: 'Gate C - Hồ Bơi Oasis', method: 'Dynamic QR', status: 'Hợp lệ' },
      ];

  const payments = isRunova
    ? [
        { id: 'INV-2026-00452', package: 'Championship Pro (3 Tháng)', amount: '4.900.000 đ', date: '15/09/2026', method: 'Chuyển khoản VietQR', status: 'PAID' },
        { id: 'INV-2026-00128', package: 'Club Player (1 Tháng)', amount: '1.800.000 đ', date: '15/08/2026', method: 'POS Quẹt thẻ', status: 'PAID' },
      ]
    : [
        { id: 'INV-2026-00452', package: 'The Sanctuary (3 Tháng)', amount: '7.500.000 đ', date: '15/09/2026', method: 'Chuyển khoản VietQR', status: 'PAID' },
        { id: 'INV-2026-00128', package: 'The Essential (1 Tháng)', amount: '2.800.000 đ', date: '15/08/2026', method: 'POS Quẹt thẻ', status: 'PAID' },
      ];

  return (
    <div className="portal-container">
      <div className="portal-header">
        <div>
          <h1 className="portal-title">
            {isRunova ? 'Gói Sân Đấu & Thẻ Thành Viên Court Pass' : 'Gói Tập & Thẻ Thành Viên Điện Tử'}
          </h1>
          <p className="portal-subtitle">
            {isRunova
              ? 'Mã QR động đối soát cổng Turnstile cụm sân và tra cứu lịch sử giao dịch (SCMS Flow 1 & Flow 5)'
              : 'Mã QR động đối soát cổng Turnstile và tra cứu lịch sử giao dịch (SCMS Flow 1 & Flow 5)'}
          </p>
        </div>
        <span
          className="badge badge-success"
          style={{
            backgroundColor: isRunova ? 'rgba(212, 233, 92, 0.25)' : undefined,
            color: isRunova ? '#16382C' : undefined,
            borderColor: isRunova ? 'rgba(22, 56, 44, 0.2)' : undefined,
          }}
        >
          {isRunova ? 'THẺ COURT PASS ĐANG HOẠT ĐỘNG' : 'GÓI TẬP ĐANG HOẠT ĐỘNG'}
        </span>
      </div>

      <div className="grid-2">
        {/* Virtual Member Card */}
        <div
          style={{
            background: isRunova
              ? 'linear-gradient(135deg, #0F261E 0%, #16382C 55%, #1F4D3C 100%)'
              : 'linear-gradient(135deg, #2B2420 0%, #1A1614 60%, #3A322C 100%)',
            borderRadius: isRunova ? '24px' : '16px',
            padding: '36px',
            color: '#FAF8F5',
            boxShadow: isRunova
              ? '0 20px 45px rgba(22, 56, 44, 0.35), 0 0 0 1px rgba(212, 233, 92, 0.3)'
              : '0 20px 45px rgba(0, 0, 0, 0.25)',
            border: isRunova
              ? '1px solid rgba(212, 233, 92, 0.4)'
              : '1px solid rgba(194, 166, 132, 0.35)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '380px',
            transition: 'all 0.3s ease',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div
                style={{
                  fontFamily: isRunova ? 'var(--font-heading)' : 'var(--font-serif)',
                  fontSize: isRunova ? '1.6rem' : '1.4rem',
                  letterSpacing: isRunova ? '0.08em' : '0.18em',
                  fontWeight: 800,
                  color: isRunova ? '#D4E95C' : '#FAF8F5',
                }}
              >
                {isRunova ? 'RUNOVA ATHLETIC CLUB' : 'SÖL WELLNESS SANCTUARY'}
              </div>
              <div
                style={{
                  fontSize: '0.7rem',
                  color: isRunova ? '#FFFFFF' : '#C2A684',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontWeight: isRunova ? 600 : 400,
                }}
              >
                {isRunova ? 'SPORTVERSE PRO COURT PASS' : 'VIP RESIDENCY MEMBER PASS'}
              </div>
            </div>

            <span
              style={{
                background: isRunova ? '#D4E95C' : '#C2A684',
                color: isRunova ? '#16382C' : '#1A1614',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                padding: '5px 12px',
                borderRadius: isRunova ? '9999px' : '4px',
              }}
            >
              ACTIVE
            </span>
          </div>

          {/* Dynamic QR Display */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px', margin: '24px 0' }}>
            {/* SVG Simulated QR */}
            <div
              style={{
                background: '#FFFFFF',
                padding: '12px',
                borderRadius: isRunova ? '16px' : '8px',
                width: '120px',
                height: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isRunova
                  ? '0 8px 24px rgba(0, 0, 0, 0.4)'
                  : '0 8px 20px rgba(0, 0, 0, 0.3)',
              }}
            >
              <svg width="100" height="100" viewBox="0 0 100 100" fill={isRunova ? '#16382C' : '#1A1614'}>
                <rect x="0" y="0" width="30" height="30" />
                <rect x="5" y="5" width="20" height="20" fill="white" />
                <rect x="10" y="10" width="10" height="10" />

                <rect x="70" y="0" width="30" height="30" />
                <rect x="75" y="5" width="20" height="20" fill="white" />
                <rect x="80" y="10" width="10" height="10" />

                <rect x="0" y="70" width="30" height="30" />
                <rect x="5" y="75" width="20" height="20" fill="white" />
                <rect x="10" y="80" width="10" height="10" />

                <rect x="38" y="38" width="24" height="24" />
                <rect x="42" y="10" width="16" height="10" />
                <rect x="70" y="45" width="18" height="14" />
                <rect x="45" y="70" width="20" height="18" />
              </svg>
            </div>

            <div>
              <div
                style={{
                  fontSize: '0.72rem',
                  color: isRunova ? '#A3B8AC' : '#B8AFA6',
                  letterSpacing: '0.12em',
                  marginBottom: '4px',
                  fontWeight: 600,
                }}
              >
                {isRunova ? 'MÃ QR CỬA SÂN TỰ ĐỘNG' : 'MÃ QR CỬA TỰ ĐỘNG'}
              </div>
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '1.05rem',
                  letterSpacing: '0.1em',
                  color: isRunova ? '#D4E95C' : '#FAF8F5',
                  fontWeight: 700,
                }}
              >
                {isRunova ? 'RUNOVA-CP89-9831' : 'SOL-MB89-9831'}
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: isRunova ? '#FFFFFF' : '#C2A684',
                  marginTop: '8px',
                }}
              >
                ⟳ Tự động làm mới sau: <strong>{secondsLeft}s</strong>
              </div>
              <div
                style={{
                  fontSize: '0.68rem',
                  color: isRunova ? '#8E9C92' : '#9E958C',
                  marginTop: '4px',
                }}
              >
                {isRunova
                  ? 'Đưa mã vào mắt đọc turnstile tại sảnh sân để vào sân đấu.'
                  : 'Đưa mã vào mắt đọc turnstile tại sảnh chính để vào cổng.'}
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderTop: isRunova
                ? '1px solid rgba(212, 233, 92, 0.2)'
                : '1px solid rgba(255, 255, 255, 0.1)',
              paddingTop: '16px',
            }}
          >
            <div>
              <div style={{ fontSize: '0.65rem', color: isRunova ? '#A3B8AC' : '#B8AFA6', letterSpacing: '0.1em' }}>
                CHỦ THẺ
              </div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>NGUYỄN VĂN AN</div>
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', color: isRunova ? '#A3B8AC' : '#B8AFA6', letterSpacing: '0.1em' }}>
                MÃ HỘI VIÊN
              </div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>MB-2026-089</div>
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', color: isRunova ? '#A3B8AC' : '#B8AFA6', letterSpacing: '0.1em' }}>
                NGÀY HẾT HẠN
              </div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  color: isRunova ? '#D4E95C' : '#C2A684',
                }}
              >
                26/12/2026
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Specifications */}
        <div className="portal-card" style={{ borderRadius: isRunova ? '24px' : undefined }}>
          <div className="portal-card-header">
            <h2 className="portal-card-title">
              {isRunova ? 'Chi Tiết Thẻ Thành Viên Court Pass' : 'Chi Tiết Hợp Đồng Hội Viên'}
            </h2>
            <span
              className="badge badge-success"
              style={{
                backgroundColor: isRunova ? 'rgba(212, 233, 92, 0.25)' : undefined,
                color: isRunova ? '#16382C' : undefined,
              }}
            >
              {isRunova ? 'CHAMPIONSHIP PRO (3 THÁNG)' : '3 THÁNG RESIDENCY'}
            </span>
          </div>

          <div style={{ display: 'grid', gap: '14px', fontSize: '0.88rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #F0ECE6' }}>
              <span style={{ color: '#7E7771' }}>Tên gói dịch vụ:</span>
              <strong>{isRunova ? 'Championship Pro Tier' : 'The Sanctuary Residency'}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #F0ECE6' }}>
              <span style={{ color: '#7E7771' }}>Ngày kích hoạt (Start Date):</span>
              <span>15/09/2026</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #F0ECE6' }}>
              <span style={{ color: '#7E7771' }}>Ngày hết hạn (End Date):</span>
              <strong style={{ color: '#15803d' }}>26/12/2026 (Còn 42 ngày)</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #F0ECE6' }}>
              <span style={{ color: '#7E7771' }}>
                {isRunova ? 'Đặc quyền khung giờ sân:' : 'Số buổi học nhóm kèm theo:'}
              </span>
              <span>
                {isRunova
                  ? 'Toàn quyền giờ vàng (17h - 22h) Tennis, Padel & Cầu lông'
                  : 'Không giới hạn (Unlimited classes)'}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #F0ECE6' }}>
              <span style={{ color: '#7E7771' }}>
                {isRunova ? 'Số buổi HLV cá nhân & Phân tích AI:' : 'Số buổi HLV cá nhân 1-1 còn lại:'}
              </span>
              <strong>3 / 4 buổi</strong>
            </div>
          </div>

          <button
            type="button"
            className="btn-primary"
            style={{
              width: '100%',
              justifyContent: 'center',
              marginTop: '24px',
              backgroundColor: isRunova ? '#16382C' : undefined,
              color: isRunova ? '#D4E95C' : undefined,
              borderRadius: isRunova ? '9999px' : undefined,
              fontWeight: 700,
            }}
            onClick={() => alert('Yêu cầu gia hạn hợp đồng đã được chuyển tới quầy Lễ tân!')}
          >
            {isRunova ? 'Gia Hạn Thẻ Thành Viên Sân Đấu' : 'Gia Hạn Hợp Đồng Hội Viên'}
          </button>
        </div>
      </div>

      {/* Tables: Check-in Logs & Invoices */}
      <div className="grid-2" style={{ marginTop: '28px' }}>
        {/* Check-in Log Table */}
        <div className="portal-card" style={{ borderRadius: isRunova ? '24px' : undefined }}>
          <div className="portal-card-header">
            <h2 className="portal-card-title">Nhật Ký Quét Cổng Turnstile</h2>
            <span className="badge badge-info">TABLE: center_checkins</span>
          </div>

          <div className="portal-table-wrapper">
            <table className="portal-table">
              <thead>
                <tr>
                  <th>Ngày</th>
                  <th>Giờ</th>
                  <th>Cổng quét</th>
                  <th>Phương thức</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {checkinLogs.map((log, i) => (
                  <tr key={i}>
                    <td>{log.date}</td>
                    <td style={{ fontWeight: 600 }}>{log.time}</td>
                    <td>{log.gate}</td>
                    <td>{log.method}</td>
                    <td>
                      <span
                        className="badge badge-success"
                        style={{
                          backgroundColor: isRunova ? 'rgba(212, 233, 92, 0.25)' : undefined,
                          color: isRunova ? '#16382C' : undefined,
                        }}
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Invoice & Payments History */}
        <div className="portal-card" style={{ borderRadius: isRunova ? '24px' : undefined }}>
          <div className="portal-card-header">
            <h2 className="portal-card-title">Hóa Đơn &amp; Lịch Sử Thanh Toán</h2>
            <span className="badge badge-info">TABLE: payments &amp; invoices</span>
          </div>

          <div className="portal-table-wrapper">
            <table className="portal-table">
              <thead>
                <tr>
                  <th>Mã Hóa Đơn</th>
                  <th>Khoản mục</th>
                  <th>Số tiền</th>
                  <th>Hình thức</th>
                  <th>Tình trạng</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id}>
                    <td style={{ fontWeight: 600, fontFamily: 'monospace' }}>{p.id}</td>
                    <td>{p.package}</td>
                    <td style={{ fontWeight: 600 }}>{p.amount}</td>
                    <td>{p.method}</td>
                    <td>
                      <span
                        className="badge badge-success"
                        style={{
                          backgroundColor: isRunova ? 'rgba(212, 233, 92, 0.25)' : undefined,
                          color: isRunova ? '#16382C' : undefined,
                        }}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}


import React, { useState } from 'react';

export function StaffReceptionPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [foundMember, setFoundMember] = useState<{
    id: number;
    name: string;
    code: string;
    phone: string;
    currentPackage: string;
    status: 'ACTIVE' | 'EXPIRED' | 'NONE';
    endDate: string;
  } | null>({
    id: 1,
    name: 'Nguyễn Văn An',
    code: 'MB-2026-089',
    phone: '0908 123 456',
    currentPackage: 'The Sanctuary (3 Tháng)',
    status: 'ACTIVE',
    endDate: '26/12/2026',
  });

  const [paymentForm, setPaymentForm] = useState({
    packageId: 'sanctuary',
    amount: '7.500.000',
    method: 'POS_CARD',
    notes: 'Thanh toán gia hạn tại quầy Lễ tân sảnh A',
  });

  const [invoiceIssued, setInvoiceIssued] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      alert('Vui lòng nhập SĐT hoặc Mã hội viên');
      return;
    }
    // Mock found result
    setFoundMember({
      id: 2,
      name: 'Lê Hoàng Minh',
      code: 'MB-2026-104',
      phone: searchQuery,
      currentPackage: 'The Essential (1 Tháng)',
      status: 'EXPIRED',
      endDate: '20/09/2026',
    });
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    const newInvoiceNo = `INV-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setInvoiceIssued(newInvoiceNo);
  };

  return (
    <div className="portal-container">
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Bàn Tiếp Đón &amp; Thu Phí POS Lễ Tân</h1>
          <p className="portal-subtitle">
            Tra cứu hội viên, xử lý thanh toán đa kênh và phát hành hóa đơn điện tử (SCMS Flow 1 &amp; Flow 2)
          </p>
        </div>
        <span className="badge badge-info">QUẦY LỄ TÂN SẢNH CHÍNH</span>
      </div>

      {/* Member Lookup Bar */}
      <div className="portal-card" style={{ marginBottom: '24px' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <input
              type="text"
              placeholder="Nhập Số điện thoại, CCCD hoặc Mã hội viên (ví dụ: 0908123456, MB-2026-089)..."
              className="portal-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary">
            Tra Cứu Hội Viên
          </button>
        </form>
      </div>

      <div className="grid-2">
        {/* Member Profile Quick Card */}
        <div className="portal-card">
          <div className="portal-card-header">
            <h2 className="portal-card-title">Thông Tin Hội Viên</h2>
            {foundMember && (
              <span className={`badge ${foundMember.status === 'ACTIVE' ? 'badge-success' : 'badge-danger'}`}>
                {foundMember.status}
              </span>
            )}
          </div>

          {foundMember ? (
            <div>
              <div style={{ display: 'grid', gap: '12px', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #F0ECE6' }}>
                  <span style={{ color: '#7E7771' }}>Họ và tên:</span>
                  <strong>{foundMember.name}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #F0ECE6' }}>
                  <span style={{ color: '#7E7771' }}>Mã hội viên:</span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{foundMember.code}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #F0ECE6' }}>
                  <span style={{ color: '#7E7771' }}>Số điện thoại:</span>
                  <strong>{foundMember.phone}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #F0ECE6' }}>
                  <span style={{ color: '#7E7771' }}>Gói tập hiện tại:</span>
                  <span>{foundMember.currentPackage}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #F0ECE6' }}>
                  <span style={{ color: '#7E7771' }}>Ngày hết hạn:</span>
                  <span style={{ color: foundMember.status === 'ACTIVE' ? '#15803d' : '#b91c1c', fontWeight: 600 }}>
                    {foundMember.endDate}
                  </span>
                </div>
              </div>

              <div style={{ marginTop: '24px', display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  className="btn-secondary btn-sm"
                  onClick={() => alert(`Đã cấp mã QR thẻ thay thế cho hội viên ${foundMember.name}`)}
                >
                  Cấp Lại Thẻ QR
                </button>
                <button
                  type="button"
                  className="btn-secondary btn-sm"
                  onClick={() => alert(`Lịch sử tham gia: 18 buổi tập trong 30 ngày qua`)}
                >
                  Xem Lịch Sử Điểm Danh
                </button>
              </div>
            </div>
          ) : (
            <div style={{ color: '#7E7771', textAlign: 'center', padding: '40px 0' }}>
              Nhập từ khóa tìm kiếm để tra cứu thông tin khách hàng.
            </div>
          )}
        </div>

        {/* POS Payment & Billing Panel */}
        <div className="portal-card">
          <div className="portal-card-header">
            <h2 className="portal-card-title">Xử Lý Thu Phí &amp; Hóa Đơn (POS)</h2>
            <span className="badge badge-warning">MODULE F: BILLING</span>
          </div>

          {invoiceIssued ? (
            <div
              style={{
                backgroundColor: '#F0FDF4',
                border: '1px solid #86EFAC',
                borderRadius: '8px',
                padding: '28px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🧾</div>
              <h3 style={{ margin: '0 0 6px 0', color: '#166534' }}>Giao Dịch Đã Thành Công!</h3>
              <p style={{ fontSize: '0.88rem', color: '#15803D', marginBottom: '16px' }}>
                Hóa đơn điện tử số <strong>{invoiceIssued}</strong> đã được ghi vào bảng <code>invoices</code>. Gói tập
                của hội viên đã tự động gia hạn thêm ngày.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                <button type="button" className="btn-primary btn-sm" onClick={() => alert('Đang in hóa đơn...')}>
                  In Hóa Đơn Khách Hàng
                </button>
                <button type="button" className="btn-secondary btn-sm" onClick={() => setInvoiceIssued(null)}>
                  Tạo Giao Dịch Mới
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePayment}>
              <div className="portal-form-group">
                <label className="portal-label">Chọn Gói Dịch Vụ Mua / Gia Hạn</label>
                <select
                  className="portal-select"
                  value={paymentForm.packageId}
                  onChange={(e) => {
                    const pkg = e.target.value;
                    const amount = pkg === 'essential' ? '2.800.000' : pkg === 'sanctuary' ? '7.500.000' : '26.000.000';
                    setPaymentForm({ ...paymentForm, packageId: pkg, amount });
                  }}
                >
                  <option value="essential">The Essential (1 Tháng — 2.800.000 VNĐ)</option>
                  <option value="sanctuary">The Sanctuary (3 Tháng — 7.500.000 VNĐ)</option>
                  <option value="sovereign">The Sovereign (1 Năm VIP — 26.000.000 VNĐ)</option>
                </select>
              </div>

              <div className="grid-2">
                <div className="portal-form-group">
                  <label className="portal-label">Số Tiền Thanh Toán</label>
                  <input
                    type="text"
                    className="portal-input"
                    value={`${paymentForm.amount} VNĐ`}
                    disabled
                    readOnly
                    style={{ fontWeight: 600 }}
                  />
                </div>

                <div className="portal-form-group">
                  <label className="portal-label">Phương Thức Thanh Toán</label>
                  <select
                    className="portal-select"
                    value={paymentForm.method}
                    onChange={(e) => setPaymentForm({ ...paymentForm, method: e.target.value })}
                  >
                    <option value="POS_CARD">POS Quẹt thẻ ngân hàng</option>
                    <option value="VIETQR">Chuyển khoản VietQR tức thì</option>
                    <option value="CASH">Tiền mặt tại quầy</option>
                    <option value="E_WALLET">Ví điện tử MoMo / ZaloPay</option>
                  </select>
                </div>
              </div>

              <div className="portal-form-group">
                <label className="portal-label">Ghi Chú Hóa Đơn</label>
                <input
                  type="text"
                  className="portal-input"
                  value={paymentForm.notes}
                  onChange={(e) => setPaymentForm({ ...paymentForm, notes: e.target.value })}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Xác Nhận Thu Tiền &amp; Xuất Hóa Đơn
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

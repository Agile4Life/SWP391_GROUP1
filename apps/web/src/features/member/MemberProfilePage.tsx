import React, { useState, useEffect } from 'react';
import { useTheme } from '../../shared/context/ThemeContext';

export function MemberProfilePage() {
  const { theme } = useTheme();
  const isRunova = theme === 'runova';

  const [profile, setProfile] = useState({
    fullName: 'Nguyễn Văn An',
    membershipCode: 'MB-2026-089',
    email: isRunova ? 'an.member@runova-sports.vn' : 'an.member@sol-wellness.vn',
    phone: '0908 123 456',
    gender: 'Nam',
    birthday: '1995-08-16',
    emergencyContact: 'Nguyễn Thị Hoa (Chị gái) - 0912 345 678',
    fitnessGoal: isRunova
      ? 'Tối ưu độ chính xác cú vung vợt (Forehand/Backhand), tốc độ phản xạ và nâng cao thứ hạng ELO giải đấu CLB.'
      : 'Tăng cơ nạc, tối ưu hóa độ linh hoạt và giảm tỷ lệ mỡ dưới 12%',
    fitnessLevel: 'Intermediate',
    healthNotes: isRunova
      ? 'Khớp cổ tay và khớp gối hoạt động tốt, không có tiền sử chấn thương dây chằng.'
      : 'Từng căng cơ bắp chuối nhẹ năm 2024, không có bệnh lý tim mạch.',
  });

  useEffect(() => {
    setProfile((prev) => ({
      ...prev,
      email: isRunova ? 'an.member@runova-sports.vn' : 'an.member@sol-wellness.vn',
      fitnessGoal: isRunova
        ? 'Tối ưu độ chính xác cú vung vợt (Forehand/Backhand), tốc độ phản xạ và nâng cao thứ hạng ELO giải đấu CLB.'
        : 'Tăng cơ nạc, tối ưu hóa độ linh hoạt và giảm tỷ lệ mỡ dưới 12%',
      healthNotes: isRunova
        ? 'Khớp cổ tay và khớp gối hoạt động tốt, không có tiền sử chấn thương dây chằng.'
        : 'Từng căng cơ bắp chuối nhẹ năm 2024, không có bệnh lý tim mạch.',
    }));
  }, [isRunova]);

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inbodyLogs = isRunova
    ? [
        { date: '15/09/2026', weight: '68.5 kg', bmi: '21.8', muscle: '34.2 kg', bodyFat: '14.2%', coach: 'Coach Rafael Lâm' },
        { date: '15/08/2026', weight: '69.8 kg', bmi: '22.3', muscle: '33.8 kg', bodyFat: '15.6%', coach: 'Coach Rafael Lâm' },
        { date: '15/07/2026', weight: '71.2 kg', bmi: '22.7', muscle: '33.1 kg', bodyFat: '17.1%', coach: 'Coach Minh Trí' },
      ]
    : [
        { date: '15/09/2026', weight: '68.5 kg', bmi: '21.8', muscle: '34.2 kg', bodyFat: '14.2%', coach: 'Master Elena Vũ' },
        { date: '15/08/2026', weight: '69.8 kg', bmi: '22.3', muscle: '33.8 kg', bodyFat: '15.6%', coach: 'Master Elena Vũ' },
        { date: '15/07/2026', weight: '71.2 kg', bmi: '22.7', muscle: '33.1 kg', bodyFat: '17.1%', coach: 'Coach Minh Trí' },
      ];

  return (
    <div className="portal-container">
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Hồ Sơ Hội Viên &amp; Chỉ Số Sức Khỏe</h1>
          <p className="portal-subtitle">Quản lý dữ liệu định danh, mục tiêu thể chất và lịch sử đo đạc sinh trắc học</p>
        </div>
        {saved && (
          <span
            className="badge badge-success"
            style={{
              backgroundColor: isRunova ? 'rgba(212, 233, 92, 0.25)' : undefined,
              color: isRunova ? '#16382C' : undefined,
            }}
          >
            ✓ Đã lưu thay đổi thành công!
          </span>
        )}
      </div>

      <div className="grid-2">
        {/* Personal & Fitness Info Form */}
        <div className="portal-card" style={{ borderRadius: isRunova ? '24px' : undefined }}>
          <div className="portal-card-header">
            <h2 className="portal-card-title">Thông Tin Cá Nhân &amp; Mục Tiêu</h2>
          </div>

          <form onSubmit={handleSave}>
            <div className="grid-2">
              <div className="portal-form-group">
                <label className="portal-label">Họ và Tên</label>
                <input
                  type="text"
                  className="portal-input"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                />
              </div>

              <div className="portal-form-group">
                <label className="portal-label">Mã Hội Viên</label>
                <input type="text" className="portal-input" value={profile.membershipCode} disabled readOnly />
              </div>
            </div>

            <div className="grid-2">
              <div className="portal-form-group">
                <label className="portal-label">Địa Chỉ Email</label>
                <input
                  type="email"
                  className="portal-input"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>

              <div className="portal-form-group">
                <label className="portal-label">Số Điện Thoại</label>
                <input
                  type="tel"
                  className="portal-input"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="grid-2">
              <div className="portal-form-group">
                <label className="portal-label">Trình Độ Thể Lực</label>
                <select
                  className="portal-select"
                  value={profile.fitnessLevel}
                  onChange={(e) => setProfile({ ...profile, fitnessLevel: e.target.value })}
                >
                  <option value="Beginner">Beginner (Mới bắt đầu)</option>
                  <option value="Intermediate">Intermediate (Trung cấp)</option>
                  <option value="Advanced">Advanced (Nâng cao / Chuyên nghiệp)</option>
                </select>
              </div>

              <div className="portal-form-group">
                <label className="portal-label">Liên Hệ Khẩn Cấp</label>
                <input
                  type="text"
                  className="portal-input"
                  value={profile.emergencyContact}
                  onChange={(e) => setProfile({ ...profile, emergencyContact: e.target.value })}
                />
              </div>
            </div>

            <div className="portal-form-group">
              <label className="portal-label">Mục Tiêu Thể Lực (Fitness Goal)</label>
              <textarea
                rows={2}
                className="portal-textarea"
                value={profile.fitnessGoal}
                onChange={(e) => setProfile({ ...profile, fitnessGoal: e.target.value })}
              />
            </div>

            <div className="portal-form-group">
              <label className="portal-label">Ghi Chú Y Tế &amp; Tiền Sử Chấn Thương (Health Notes)</label>
              <textarea
                rows={2}
                className="portal-textarea"
                value={profile.healthNotes}
                onChange={(e) => setProfile({ ...profile, healthNotes: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{
                marginTop: '8px',
                backgroundColor: isRunova ? '#16382C' : undefined,
                color: isRunova ? '#D4E95C' : undefined,
                borderRadius: isRunova ? '9999px' : undefined,
                fontWeight: 700,
              }}
            >
              Lưu Cập Nhật Hồ Sơ
            </button>
          </form>
        </div>

        {/* Biometrics & InBody History */}
        <div className="portal-card" style={{ borderRadius: isRunova ? '24px' : undefined }}>
          <div className="portal-card-header">
            <h2 className="portal-card-title">
              {isRunova ? 'Chỉ Số Thể Lực & Đo InBody 770' : 'Lịch Sử Đo InBody 770'}
            </h2>
            <span className="badge badge-info">3 LẦN ĐO GẦN NHẤT</span>
          </div>

          <p style={{ fontSize: '0.85rem', color: '#7E7771', lineHeight: 1.6, marginBottom: '20px' }}>
            Dữ liệu InBody được đồng bộ trực tiếp từ thiết bị quét tại sảnh vào bảng <code>member_progress_logs</code>{' '}
            phục vụ thuật toán gợi ý bài tập AI.
          </p>

          <div className="portal-table-wrapper">
            <table className="portal-table">
              <thead>
                <tr>
                  <th>Ngày đo</th>
                  <th>Cân nặng</th>
                  <th>BMI</th>
                  <th>Khối lượng cơ</th>
                  <th>% Mỡ</th>
                  <th>HLV phụ trách</th>
                </tr>
              </thead>
              <tbody>
                {inbodyLogs.map((log, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600 }}>{log.date}</td>
                    <td>{log.weight}</td>
                    <td>
                      <span
                        className="badge badge-success"
                        style={{
                          backgroundColor: isRunova ? 'rgba(212, 233, 92, 0.25)' : undefined,
                          color: isRunova ? '#16382C' : undefined,
                        }}
                      >
                        {log.bmi}
                      </span>
                    </td>
                    <td>{log.muscle}</td>
                    <td>{log.bodyFat}</td>
                    <td>{log.coach}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            style={{
              marginTop: '24px',
              padding: '16px',
              background: isRunova ? '#F4F7F4' : '#F8F6F2',
              borderRadius: isRunova ? '16px' : '6px',
              border: isRunova ? '1px solid rgba(22, 56, 44, 0.1)' : 'none',
            }}
          >
            <div style={{ fontWeight: 700, fontSize: '0.82rem', marginBottom: '4px', color: isRunova ? '#16382C' : undefined }}>
              💡 Đánh giá tiến độ 60 ngày:
            </div>
            <div style={{ fontSize: '0.8rem', color: isRunova ? '#2B4A3D' : '#6A635D', lineHeight: 1.6 }}>
              {isRunova
                ? 'Khối lượng cơ bộc phát tăng +1.1 kg, tốc độ phản xạ và lực vung vợt cải thiện 14%. Thể trạng đáp ứng rất tốt với chu kỳ luyện tập Tennis & Padel cường độ cao kết hợp phân tích AI.'
                : 'Khối lượng cơ tăng trưởng +1.1 kg và tỷ lệ mỡ giảm -2.9%. Thể trạng đáp ứng rất tốt với giáo án Reformer Pilates kết hợp chu kỳ tập tạ ngắt quãng.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

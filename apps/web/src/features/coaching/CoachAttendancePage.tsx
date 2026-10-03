import { useState } from 'react';

interface AttendanceStudent {
  id: number;
  name: string;
  code: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE';
  evaluation: string;
}

export function CoachAttendancePage() {
  const [selectedSession, setSelectedSession] = useState('session-1');

  const [students, setStudents] = useState<AttendanceStudent[]>([
    {
      id: 1,
      name: 'Nguyễn Văn An',
      code: 'MB-2026-089',
      status: 'PRESENT',
      evaluation: 'Thực hiện động tác Elephant & Long Stretch rất chuẩn, kiểm soát hơi thở tốt.',
    },
    {
      id: 2,
      name: 'Trần Thị Mai',
      code: 'MB-2026-054',
      status: 'PRESENT',
      evaluation: 'Cơ vai còn hơi gồng, đã nhắc nhở thả lỏng trong động tác Chest Expansion.',
    },
    {
      id: 3,
      name: 'Lê Quốc Bảo',
      code: 'MB-2026-112',
      status: 'LATE',
      evaluation: 'Đến trễ 10 phút, đã bù phần khởi động làm ấm khớp cổ chân.',
    },
    {
      id: 4,
      name: 'Vũ Minh Hằng',
      code: 'MB-2026-077',
      status: 'ABSENT',
      evaluation: 'Có báo nghỉ trước 2h vì lịch công tác đột xuất.',
    },
  ]);

  const updateStatus = (id: number, status: 'PRESENT' | 'ABSENT' | 'LATE') => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
  };

  const updateEval = (id: number, evaluation: string) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, evaluation } : s)));
  };

  const handleSaveAttendance = () => {
    alert('Đã lưu điểm danh và đánh giá buổi học.');
  };

  return (
    <div className="portal-container">
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Điểm Danh</h1>
        </div>
        <button type="button" className="btn-primary" onClick={handleSaveAttendance}>
          Lưu Bảng Điểm Danh
        </button>
      </div>

      {/* Session Header Selector */}
      <div className="portal-card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '0.75rem', letterSpacing: '0.12em', color: '#8C847C', textTransform: 'uppercase' }}>
              BUỔI HỌC ĐANG CHỌN:
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', margin: '4px 0 0 0' }}>
              Reformer Core Architecture • 17:30 - 18:30 Hôm nay
            </h3>
            <div style={{ fontSize: '0.82rem', color: '#6A635D', marginTop: '4px' }}>
              📍 Studio 01 (Level 2) • Sĩ số: <strong>4 học viên đăng ký</strong>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <select
              className="portal-select"
              value={selectedSession}
              onChange={(e) => setSelectedSession(e.target.value)}
              style={{ width: 'auto' }}
            >
              <option value="session-1">Lớp 17:30 (Reformer Core) - Hôm nay</option>
              <option value="session-2">Lớp 19:00 (Yin Yoga Deep) - Hôm nay</option>
              <option value="session-3">Lớp 08:00 (Olympic Barbell) - Ngày mai</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* Attendance List */}
        <div className="portal-card" style={{ flex: 1.4 }}>
          <div className="portal-card-header">
            <h2 className="portal-card-title">Danh Sách Học Viên Điểm Danh</h2>
          </div>

          <div style={{ display: 'grid', gap: '18px' }}>
            {students.map((stu) => (
              <div
                key={stu.id}
                style={{
                  padding: '16px 20px',
                  backgroundColor: '#FAF8F5',
                  borderRadius: '6px',
                  border: '1px solid rgba(33, 28, 24, 0.08)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div>
                    <strong style={{ fontSize: '1rem', color: '#1A1614' }}>{stu.name}</strong>
                    <span style={{ fontSize: '0.75rem', color: '#8C847C', marginLeft: '10px', fontFamily: 'monospace' }}>
                      {stu.code}
                    </span>
                  </div>

                  {/* Attendance Radio Buttons */}
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      type="button"
                      onClick={() => updateStatus(stu.id, 'PRESENT')}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '4px',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        border: '1px solid',
                        cursor: 'pointer',
                        backgroundColor: stu.status === 'PRESENT' ? '#15803d' : '#FFFFFF',
                        color: stu.status === 'PRESENT' ? '#FFFFFF' : '#15803d',
                        borderColor: '#15803d',
                      }}
                    >
                      Có Mặt
                    </button>
                    <button
                      type="button"
                      onClick={() => updateStatus(stu.id, 'LATE')}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '4px',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        border: '1px solid',
                        cursor: 'pointer',
                        backgroundColor: stu.status === 'LATE' ? '#b45309' : '#FFFFFF',
                        color: stu.status === 'LATE' ? '#FFFFFF' : '#b45309',
                        borderColor: '#b45309',
                      }}
                    >
                      Trễ
                    </button>
                    <button
                      type="button"
                      onClick={() => updateStatus(stu.id, 'ABSENT')}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '4px',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        border: '1px solid',
                        cursor: 'pointer',
                        backgroundColor: stu.status === 'ABSENT' ? '#b91c1c' : '#FFFFFF',
                        color: stu.status === 'ABSENT' ? '#FFFFFF' : '#b91c1c',
                        borderColor: '#b91c1c',
                      }}
                    >
                      Vắng
                    </button>
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    className="portal-input"
                    placeholder="Ghi chú đánh giá thể trạng, kỹ thuật động tác..."
                    value={stu.evaluation}
                    onChange={(e) => updateEval(stu.id, e.target.value)}
                    style={{ fontSize: '0.8rem', padding: '8px 12px' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Coaching Assistant Panel */}
        <div className="portal-card" style={{ background: '#FAF7F2', border: '1px solid #E5DED5' }}>
          <div className="portal-card-header">
            <h2 className="portal-card-title">✨ Trợ Lý AI Gợi Ý Giáo Án</h2>
          </div>

          <p style={{ fontSize: '0.86rem', color: '#4A433D', lineHeight: 1.65 }}>
            Trợ lý AI phân tích hồ sơ sức khỏe và tiền sử căng cơ của học viên{' '}
            <strong>Nguyễn Văn An (MB-2026-089)</strong> để đề xuất điều chỉnh bài tập cho Coach:
          </p>

          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '6px',
              padding: '16px',
              border: '1px solid rgba(33, 28, 24, 0.08)',
              marginTop: '16px',
              marginBottom: '16px',
              fontSize: '0.82rem',
              lineHeight: 1.6,
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: '6px' }}>⚡ Điều chỉnh kỹ thuật gợi ý:</div>
            <div>• Giảm 1 lò xo đỏ xuống 1 lò xo xanh khi tập chuỗi động tác Elephant trên Reformer.</div>
            <div>• Tăng thêm 5 phút kéo dãn cơ tam đầu đùi sau buổi tập để chống căng cứng.</div>
            <div style={{ marginTop: '8px', color: '#8C7765' }}>
              Độ tin cậy mô hình: <strong>96.4%</strong> (Dựa trên 18 logs trước đó)
            </div>
          </div>

          <button
            type="button"
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => alert('Đã duyệt và lưu kế hoạch bài tập.')}
          >
            Duyệt &amp; Giao Bài Tập Cho Học Viên
          </button>
        </div>
      </div>
    </div>
  );
}
